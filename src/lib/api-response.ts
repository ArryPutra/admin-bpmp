import { NextResponse } from "next/server";

type ApiSuccess<T> = {
    success: true;
    data: T;
    message?: string;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
    };
};

type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export function successResponse<T>(
    data: T,
    options?: {
        message?: string;
        status?: number;
        meta?: ApiSuccess<T>["meta"];
    }
) {
    const { message, status = 200, meta } = options ?? {};
    return NextResponse.json<ApiSuccess<T>>(
        { success: true, data, message, meta },
        { status }
    );
}

export function errorResponse(
  code: string,
  message: string,
  options?: { status?: number; details?: unknown }
) {
  const { status = 500, details } = options ?? {};
  return NextResponse.json<ApiError>(
    { success: false, error: { code, message, details } },
    { status }
  );
}