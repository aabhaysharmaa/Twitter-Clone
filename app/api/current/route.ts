import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/libs/prismaDB";

const CurrentUser = async () => {
	try {
		const session = await getServerSession(authOptions);
		if (!session?.user?.email) {
			return null;
		}
		const currentUser = await prisma?.user.findUnique({
			where: {
				email: session?.user?.email
			}
		})
		return currentUser;
	} catch (error) {
		console.log("Error in CurrentUSer ", (error as Error).message)
	}


}
export default CurrentUser;