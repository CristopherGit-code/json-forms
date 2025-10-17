import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from modules.agent import JSONAgent

logging.basicConfig( level=logging.DEBUG, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s" )
logger = logging.getLogger(__name__)

app = FastAPI(title="Forms app sample")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = JSONAgent()

@app.post("/jsonforms")
async def agentic_ui_endpoint(request: Request):
    data = await request.json()
    user_message = data.get("message", "").strip()

    if not user_message:
        return {"reply": "Please send a valid message"}
    
    gen_schema = await agent.build_schema(user_message)
    print("\n")
    print(gen_schema)
    # final_schema = json.loads(gen_schema)

    gen_ui_schema = await agent.build_ui_schema()
    print("\n")
    print(gen_ui_schema)
    # final_ui_schema = json.loads(gen_ui_schema)

    return {
        "schema": gen_schema,
        "uiSchema": gen_ui_schema
    }

# uvicorn server.main:app --reload --host 0.0.0.0 --port 8000

# Could you build a json schema app for creating an sample TODO app

"""
Create a JSON schema for a home energy audit form where the user provides their address, selects a building type (Residential or Commercial), 
chooses services like Electric or Gas, enters the residence area with a slider between 500 and 5000 square feet, specifies the number of water heaters (0-2), 
and toggles options for furnace fan, sump pump, and air conditioner. Include sliders for how many bulbs they'll replace (0-20) and how many years to evaluate benefits (1-10).
Also include fields for whether an audit is requested, plus date, time, and email. Make address, building type, and number of bulbs required.
"""