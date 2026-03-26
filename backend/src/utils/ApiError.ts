class ApiError extends Error {
  constructor(statusCode:number, message = "Something went Wrong") {
    super(message); 
    this.statusCode = statusCode;
    this.success = false; 
  }
}

export { ApiError };