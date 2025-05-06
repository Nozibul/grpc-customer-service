export function handleError(err, response, onSuccess) {
  if (err) {
    console.error("[gRPC Error]", err.message);
  } else onSuccess(response);
}
