import getUser from "./get-user";
import * as axios from "axios";

jest.mock("axios");

describe("get user service", () => {
    
	test("should return user when API call is successful", async () => {
	
        axios.get.mockResolvedValue({
            data: {
                    name: "Ubuntu",
                    age: 22
                }
        })

        const user = await getUser()
        expect(user).toEqual({
            name: "Ubuntu",
            age: 22

        });

	});

    test("should return errorMessage when API is call fails", async () => {
       
        axios.get.mockRejectedValue({
            response: {
                data: {
                    errorMessage: "404 not found"
                }
            }
        })

        axios.isAxiosError.mockImplementation((_) => true)

        const error = await getUser()
        expect(error).toEqual({
            errorMessage: "404 not found"
        });
        
    })

    test.only("should return errorMessage when axios error is not thier", async () => {

        const error = await getUser()

        expect(error).toEqual({
            errorMessage: "something went wrong!"
        })


    })
});
