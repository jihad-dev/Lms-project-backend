"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_services_1 = require("./auth.services");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Validate required fields
        if (!name || !email || !password) {
            (0, sendResponse_1.sendResponse)(res, {
                statusCode: http_status_1.default.BAD_REQUEST,
                success: false,
                message: "Name, email, and password are required",
                data: null,
            });
            return;
        }
        const result = await auth_services_1.AuthServices.registerUser(name, email, password);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: "User registered successfully",
            data: result,
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: error.message,
            data: null,
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await auth_services_1.AuthServices.loginUser(email, password);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "User logged in successfully",
            data: {
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
                user: result.user,
            },
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: error.message,
            data: null,
        });
    }
};
const refreshToken = (0, catchAsync_1.default)(async (req, res) => {
    const { refreshToken } = req.body;
    const result = await auth_services_1.AuthServices.refreshToken(refreshToken);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Access token is retrieved successfully!',
        data: {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            user: result.user,
        },
    });
});
exports.AuthController = {
    registerUser,
    loginUser,
    refreshToken,
};
