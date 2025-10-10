type JSONSchema = {
  type: string;
  properties: { [key: string]: any };
  required?: string[];
};

function schemaToInterface(name: string, schema: JSONSchema): string {
  const { properties, required = [] } = schema;
  let interfaceStr = `interface ${name} {\n`;
  for (const [key, value] of Object.entries(properties)) {
    // Determine TypeScript type
    let tsType: string;
    switch (value.type) {
      case "string":
        if (value.enum) {
          tsType = value.enum.map((v: string) => `'${v}'`).join(" | ");
        } else {
          tsType = "string";
        }
        break;
      case "boolean":
        tsType = "boolean";
        break;
      case "integer":
      case "number":
        tsType = "number";
        break;
      default:
        tsType = "any";
    }
    // Mark optional if not required
    const optional = required.includes(key) ? "" : "?";
    interfaceStr += `  ${key}${optional}: ${tsType};\n`;
  }
  interfaceStr += "}";
  return interfaceStr;
}

// Example use:
const sampleSchema = {
  "type": "object",
  "properties": {
    "name": { "type": "string", "minLength": 1 },
    "last_name": { "type": "string", "minLength": 1 },
    "description": { "title": "Long Description", "type": "string" },
    "done": { "type": "boolean" },
    "due_date": { "type": "string", "format": "date" },
    "rating": { "type": "integer", "maximum": 5 },
    "recurrence": {
      "type": "string",
      "enum": ["Never", "Daily", "Weekly", "Monthly"]
    },
    "recurrence_interval": { "type": "integer" }
  },
  "required": ["name", "due_date"]
};

console.log(schemaToInterface("Task", sampleSchema));

export {};