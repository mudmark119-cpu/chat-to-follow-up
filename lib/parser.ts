export function safeJsonParse(raw: string): unknown {
  return JSON.parse(raw.trim());
}

function stripCodeFences(raw: string): string {
  return raw.replace(/```json|```/gi, "").trim();
}

function extractBalancedJsonObject(raw: string): string | null {
  const text = stripCodeFences(raw);
  const start = text.indexOf("{");

  if (start === -1) {
    return null;
  }

  let depth = 0;
  let inString = false;
  let escaping = false;

  for (let i = start; i < text.length; i += 1) {
    const char = text[i];

    if (inString) {
      if (escaping) {
        escaping = false;
      } else if (char === "\\") {
        escaping = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return text.slice(start, i + 1);
      }
    }
  }

  return null;
}

export function repairJsonString(raw: string): string {
  const candidate = extractBalancedJsonObject(raw);
  if (candidate) {
    return candidate;
  }
  return stripCodeFences(raw);
}

export function parseWithRepair(raw: string): unknown {
  try {
    return safeJsonParse(raw);
  } catch {
    const repaired = repairJsonString(raw);
    return safeJsonParse(repaired);
  }
}
