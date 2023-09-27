exports.handler = async (event) => {
    console.log(event)
    const userId = event.pathParameters.userId
    const user = {'userId': userId, 'username': 'User ' + userId }
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(user)
    }
    return response
}
