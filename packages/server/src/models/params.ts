import { Request } from "express";

export type ParamsWithId = {
    id: string;
};

export type ParamsWithToken = {
    token: string;
};

export type ParamsWithEmail = {
    email: string;
};

export type RequestWithId<
    ResBody = any,
    ReqBody = any,
    ReqQuery = qs.ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
> = Request<ParamsWithId, ResBody, ReqBody, ReqQuery, Locals>;

export type RequestWithToken<
    ResBody = any,
    ReqBody = any,
    ReqQuery = qs.ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
> = Request<ParamsWithToken, ResBody, ReqBody, ReqQuery, Locals>;

export type RequestWithEmail<
    ResBody = any,
    ReqBody = any,
    ReqQuery = qs.ParsedQs,
    Locals extends Record<string, any> = Record<string, any>
> = Request<ParamsWithEmail, ResBody, ReqBody, ReqQuery, Locals>;
