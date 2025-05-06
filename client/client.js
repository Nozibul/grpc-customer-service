const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");

// .proto file loaded
const packageDefination = protoLoader.loadSync("customers.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});

// gRPC package loaded
const grpcObject = grpc.loadPackageDefinition(packageDefination);
const CustomerService = grpcObject.CustomerService;

const client = new CustomerService(
  "0.0.0.0:50051",
  grpc.credentials.createInsecure()
);

module.exports = client;