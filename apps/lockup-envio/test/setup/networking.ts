import { endpoint } from "./constants";
import { GraphQLClient } from "graphql-request";

function _replacer(_k: string, v: unknown) {
  return typeof v === "number"
    ? v.toLocaleString("en-US", { useGrouping: false })
    : v;
}

export async function request(
  endpoint: string,
  document: string,
  variables?: Record<string, unknown>,
) {
  try {
    const client = new GraphQLClient(endpoint);
    const response = await client.request(document, variables);

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  return undefined;
}

function toEnvio<T>(response: T) {
  if (!(response instanceof Error)) {
    if (response && typeof response === "object") {
      return reformat(JSON.parse(JSON.stringify(response, _replacer))) as T;
    }
  }

  return response;
}

function toTheGraph<T>(response: T) {
  return JSON.parse(JSON.stringify(response, _replacer)) as T;
}

export async function Envio(
  document: string,
  variables?: Record<string, unknown>,
) {
  console.log("endpoint envio: ", endpoint.Envio);
  return toEnvio(await request(endpoint.Envio, document, variables));
}

export async function TheGraph(
  document: string,
  variables?: Record<string, unknown>,
) {
  return toTheGraph(await request(endpoint.TheGraph, document, variables));
}

/** --------------- Utilities --------------- */

type Envio = string;
type Singular = string;
type Plural = string;

const names: Record<Envio, [Singular, Plural]> = {
  Action: ["action", "actions"],
  Asset: ["asset", "assets"],
  Activity: ["activity", "activities"],
  Batch: ["batch", "batches"],
  Campaign: ["campaign", "campaigns"],
  Contract: ["contract", "contracts"],
  Factory: ["factory", "factories"],
  Segment: ["segment", "segments"],
  Stream: ["stream", "streams"],
  Tranche: ["tranche", "tranches"],
};

/**
 * Identify capitalized result keys as specific elements defining an ENVIO response.
 * If so, reformat the result to look exactly like the one given by The Graph.
 * Only works for minimum-depth objects (extensive nesting will need recursive formatting).
 */
function reformat(source: object) {
  let value = { ...source };

  Object.keys(value).map((_key) => {
    const key = _key as keyof typeof value;
    if (key in names) {
      const additions = names[key];
      const replicate = value[key];

      const isArray = Array.isArray(replicate);
      const isEmpty = isArray && (replicate as Array<object>).length === 0;

      const plural = isArray ? replicate : [];
      const single = isArray
        ? !isEmpty
          ? replicate[0]
          : undefined
        : replicate;

      value = {
        ...value,
        [additions[0]]: reassign(single),
        [additions[1]]: plural.map((item) => reassign(item)),
      };
    }
  });

  return value;
}

function reassign(source: object | undefined) {
  if (!source) {
    return undefined;
  }

  let value = JSON.stringify(source);

  return JSON.parse(value);
}
