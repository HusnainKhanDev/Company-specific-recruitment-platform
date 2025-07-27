// ContextMD.ts
import { ContextFunction } from '@apollo/server';
import { ExpressContextFunctionArgument } from '@as-integrations/express5';

const ContextMD: ContextFunction<[ExpressContextFunctionArgument], any> = async ({ req, res }) => {
  return {
    req,
    res,
  };
};

export default ContextMD;
