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
const customersProto = grpc.loadPackageDefinition(packageDefination);
const server = new grpc.Server();

// data
const customers = [
  {
    id: "1",
    name: "John",
    age: 30,
    address: "New York",
  },
  {
    id: "2",
    name: "Nozibul",
    age: 30,
    address: "Bangladesh",
  },
];


server.addService(customersProto.CustomerService.service, {
  GetAll: (call, callback) => {
    callback(null, { customers });
  },
  Get: (call, callback) => {
    let customer = customers.find((c) => c.id === call.request.id);
    if (customer) {
      callback(null, customer);
    } else {
      callback({ 
        code: grpc.status.NOT_FOUND, 
        details: "Customer not found" 
    });
    }
  },
  Insert: (call, callback) => {
    let customer = call.request;
    customers.push(customer);
    callback(null, customer);
  },
  Update: (call, callback) => {
    let existingCustomer = customers.find((c) => c.id === call.request.id);

    if(existingCustomer) {
      existingCustomer.name = call.request.name;
      existingCustomer.age = call.request.age;
      existingCustomer.address = call.request.address;
      callback(null, existingCustomer);
    } else {
      callback({ 
        code: grpc.status.NOT_FOUND, 
        details: "Customer not found" 
    });
    }
  },

  Remove: (call, callback) => {
    let existingCustomer = customers.find((c) => c.id === call.request.id);
    if(existingCustomer) {
      customers.splice(customers.indexOf(existingCustomer), 1);
      callback(null, existingCustomer);
    } else {
      callback({ 
        code: grpc.status.NOT_FOUND, 
        details: "Customer not found" 
    });
    }
  },
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    console.log("Server running at http://0.0.0.0:50051");
    server.start();
    console.log(`Server running at${port}`);
  }
);
