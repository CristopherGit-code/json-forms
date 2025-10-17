import json

from modules.oci_client import LLM_Open_Client

class JSONAgent:
    _instance = None
    _initialized = False

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(JSONAgent,cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        if not self._initialized:
            self.schema_client = LLM_Open_Client().build_llm_client()
            self.ui_schema_client = LLM_Open_Client().build_llm_client()
            self._example_schema = self.load_example_schema()
            self._example_ui_schema = self.load_example_ui_schema()

            self._gen_schema = {}
            self._gen_ui_schema = {}

            self._initialized = True

    def load_example_schema(self):
        with open(r"C:\Users\Cristopher Hdz\Desktop\Test\json-forms\client\src\schema\oai\schema.json",'r',encoding='utf-8') as f:
            example_schema = json.load(f)
        return str(example_schema)

    def load_example_ui_schema(self):
        with open(r"C:\Users\Cristopher Hdz\Desktop\Test\json-forms\client\src\schema\oai\uiSchema.json",'r',encoding='utf-8') as f:
            example_schema = json.load(f)
        return str(example_schema)

    async def build_schema(self,message:str):
        query = f"Based on the schema example, build a new json forms schema following the user instructions: {message}. Do not include any greatings or acknoledgements, just the json schema to copy into a json file, also, do not include any languaje specifications, just plain json, to use in json.loads method. Schema example: {self._example_schema}"
        
        for _ in range(3):
            try:
                response = await self.schema_client.ainvoke(query)
                raw_response = response.content
                print(f"Current agent schema response:\n{raw_response}\n")
                raw_json_response = json.loads(raw_response)
                
                self._gen_schema = raw_json_response

                return raw_json_response
            except Exception as e:
                print(e)

        error_response = """{"error": "Error in JSON response"}"""
        back_response = json.loads(error_response)
        
        self._gen_schema = back_response
        return back_response
    
    async def build_ui_schema(self):
        query = f"Based on the ui schema example, build a new ui schema for the current json schema: {self._gen_schema}. Do not include any greatings or acknoledgements, just the json schema to copy into a json file, also, do not include any languaje specifications, just plain json, to use in json.loads method. UI Schema example: {self._example_ui_schema}"
        
        for _ in range(3):
            try:
                response = await self.ui_schema_client.ainvoke(query)
                raw_response = response.content
                print(f"Current agent ui schema response:\n{raw_response}\n")
                raw_json_response = json.loads(raw_response)
                
                self._gen_ui_schema = raw_json_response

                return raw_json_response
            except Exception as e:
                print(e)

        error_response = """{"error": "Error in JSON UI response"}"""
        back_response = json.loads(error_response)
        
        self._gen_ui_schema = back_response
        return back_response