import * as tests from "@econnessione/core/tests";
import * as t from "io-ts";
import * as http from "../../io/http";

const {
  createdAt,
  updatedAt,
  date,
  ...ProjectImageProps
} = http.Events.ProjectImpact.type.props;

export const ProjectImpactEventArb: tests.fc.Arbitrary<http.Events.ProjectImpact> = tests
  .getArbitrary(t.strict({ ...ProjectImageProps }))
  .map((p) => ({
    ...p,
    id: tests.fc.sample(tests.fc.uuid(), 1)[0] as any,
    approvedBy: [],
    executedBy: [],
    images: [],
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
