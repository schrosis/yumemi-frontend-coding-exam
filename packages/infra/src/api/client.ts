import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Prefecture = z
  .object({ prefCode: z.number().int(), prefName: z.string() })
  .passthrough();
const PrefecturesResponse = z
  .object({ message: z.unknown().nullable(), result: z.array(Prefecture) })
  .passthrough();
const PopulationCompositionPerYear = z
  .object({
    boundaryYear: z.number().int(),
    data: z.array(
      z
        .object({
          label: z.string(),
          data: z.array(
            z
              .object({
                year: z.number().int(),
                value: z.number().int(),
                rate: z.number().optional(),
              })
              .passthrough()
          ),
        })
        .passthrough()
    ),
  })
  .passthrough();
const PopulationCompositionPerYearResponse = z
  .object({
    message: z.unknown().nullable(),
    result: PopulationCompositionPerYear,
  })
  .passthrough();

export const schemas = {
  Prefecture,
  PrefecturesResponse,
  PopulationCompositionPerYear,
  PopulationCompositionPerYearResponse,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/api/v1/population/composition/perYear",
    alias: "getApiv1populationcompositionperYear",
    description: `地域単位、年単位の年齢構成のデータを返します。`,
    requestFormat: "json",
    parameters: [
      {
        name: "prefCode",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: PopulationCompositionPerYearResponse,
  },
  {
    method: "get",
    path: "/api/v1/prefectures",
    alias: "getApiv1prefectures",
    description: `都道府県に関する一覧データを返します。`,
    requestFormat: "json",
    response: PrefecturesResponse,
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
