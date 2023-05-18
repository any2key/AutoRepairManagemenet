namespace AutoRepairManagemenet.Models
{
    public class Response
    {
        public Response()
        {

        }
        public static ErrorResponse BadResponse(string error)
        {
            return new ErrorResponse() { IsOk = false, Message = error };
        }

        public static Response OK = new Response() { IsOk = true };
        public bool IsOk { get; set; }
    }
    public class ErrorResponse : Response
    {
        public string Message { get; set; }
    }

    public class DataResponse<T> : ErrorResponse
    {
        public T Data { get; set; }
    }
}
