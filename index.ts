// @ts-ignore
import { Request } from "express";

const extractHeader = (req: Request, key: string) => {
    const value = req.headers[key];
    if (!value || typeof value !== "string") {
        return undefined;
    }

    if (!value.length) {
        return undefined;
    }

    return value;
};

const extractAuthorizationToken = (req: Request) => {
    const BearerToken = extractHeader(req, "authorization");
    if (!BearerToken) {
        return BearerToken;
    }

    const BearerTokenParts = BearerToken.split(" ");
    if (BearerTokenParts.length !== 2 || !BearerTokenParts[1]) {
        return undefined;
    }

    if (!BearerTokenParts[1].length) {
        return undefined;
    }

    return BearerTokenParts[1];
};

const extractSignature = (req: Request) => extractHeader(req, "signature");

const extractProject = (req: Request) => extractHeader(req, "project");

const extractEnvironment = (req: Request) => extractHeader(req, "environment");

const getFullUrl = (req: Request) => {
    const protocol = req.hostname.includes("localhost") ? "http" : "https";
    // @ts-ignore
    const port = protocol === "http" && process.env.PORT ? `:${process.env.PORT}` :"";
    return `${protocol}://${req.hostname}${port}${req.originalUrl}`;
};

const ExpressHelper = {
    extractHeader,
    extractAuthorizationToken,
    extractSignature,
    extractProject,
    extractEnvironment,
    getFullUrl,
};

export default ExpressHelper;
