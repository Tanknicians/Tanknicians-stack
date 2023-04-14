// required imports: Express and Prisma Database
import { router } from "../trpc";
import { serviceCallRouter } from "./ServiceCall/ServiceCallRoutes";
import { tankMetaDataRouter } from "./TankMetadata/TankMetadataRoutes";
import { userRouter } from "./User/UserRoutes";

export const databaseRouter = router({
  usr: userRouter,
  sc: serviceCallRouter,
  td: tankMetaDataRouter,
});
