import { AuthorizeResponse } from "../responses";

export const deserializeAuthorize = (authorizeResponse: AuthorizeResponse) => authorizeResponse.token