import { Request } from "express";

const extractAuthorizationToken = (req: Request) => {
    const BearerToken = req.headers.authorization;
    if (!BearerToken || typeof BearerToken !== "string") {
        return undefined;
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

const extractSignature = (req: Request) => {
    const Signature = req.headers.signature;
    if (!Signature || typeof Signature !== "string") {
        return undefined;
    }

    if (!Signature.length) {
        return undefined;
    }

    return Signature;
};

const getFullUrl = (req: Request) => {
    const protocol = req.hostname.includes("localhost") ? "http" : "https";
    return `${protocol}://${req.hostname}${req.originalUrl}`;
};

const ExpressHelper = {
    extractAuthorizationToken,
    extractSignature,
    getFullUrl,
};

export default ExpressHelper;
