import { createCtx } from "./helpers/typescript";

const [ctx, Provider] = createCtx({});

export const AppContext = ctx;
export const AppProvider = Provider;
