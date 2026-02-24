"""
Request ID middleware — generates a short UUID for every incoming request.
The ID is attached to request.state, included in response headers,
and available in log records for end-to-end tracing.
"""
import uuid
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response


class RequestIDMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        request_id = uuid.uuid4().hex[:8]
        request.state.request_id = request_id

        response = await call_next(request)
        response.headers["X-Request-ID"] = request_id
        return response
