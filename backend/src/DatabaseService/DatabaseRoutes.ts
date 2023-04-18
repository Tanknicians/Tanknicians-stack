// required imports: Express and Prisma Database
import { router } from "../trpc";
import { loginRouter } from "./Login/LoginRoutes";
import { serviceCallRouter } from "./ServiceCall/ServiceCallRoutes";
import { tankMetaDataRouter } from "./TankMetadata/TankMetadataRoutes";
import { userRouter } from "./User/UserRoutes";

export const databaseRouter = router({
  lg: loginRouter,
  sc: serviceCallRouter,
  td: tankMetaDataRouter,
  usr: userRouter,
});
