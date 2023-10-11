-- Create the Login table
CREATE TABLE `Login` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `role` ENUM('ADMIN', 'CUSTOMER', 'EMPLOYEE') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `userId` INT NOT NULL,
    UNIQUE INDEX `Login_email_key`(`email`),
    INDEX `Login_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create the User table
CREATE TABLE `User` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NULL,
    `middleName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `isEmployee` BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create the ServiceCall table
CREATE TABLE `ServiceCall` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `isApproved` BOOLEAN NOT NULL DEFAULT false,
    `createdOn` DATETIME NOT NULL,
    `customerRequest` VARCHAR(191) NOT NULL,
    `employeeNotes` VARCHAR(191),
    `notApprovedNotes` VARCHAR(191),
    `notesUpdated` DATETIME,
    `alkalinity` DOUBLE NOT NULL,
    `calcium` DOUBLE NOT NULL,
    `nitrate` DOUBLE NOT NULL,
    `phosphate` DOUBLE NOT NULL,
    `ATOOperational` BOOLEAN NOT NULL,
    `ATOReservoirFilled` BOOLEAN NOT NULL,
    `chemFilterAdjusted` BOOLEAN NOT NULL,
    `doserAdjustementOrManualDosing` BOOLEAN NOT NULL,
    `dosingReservoirsFull` BOOLEAN NOT NULL,
    `floorsCheckedForSpillsOrDirt` BOOLEAN NOT NULL,
    `glassCleanedInside` BOOLEAN NOT NULL,
    `glassCleanedOutside` BOOLEAN NOT NULL,
    `mechFilterChanged` BOOLEAN NOT NULL,
    `pumpsClearedOfDebris` BOOLEAN NOT NULL,
    `saltCreepCleaned` BOOLEAN NOT NULL,
    `skimmerCleanedAndOperational` BOOLEAN NOT NULL,
    `waterChanged` BOOLEAN NOT NULL,
    `waterTestedRecordedDated` BOOLEAN NOT NULL,
    `pestAPresent` BOOLEAN NOT NULL,
    `pestBPresent` BOOLEAN NOT NULL,
    `pestCPresent` BOOLEAN NOT NULL,
    `pestDPresent` BOOLEAN NOT NULL,
    `employeeId` INT NOT NULL,
    `tankId` INT NOT NULL,
    INDEX `ServiceCall_employeeId_idx`(`employeeId`),
    INDEX `ServiceCall_tankId_idx`(`tankId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create the TankMetadata table
CREATE TABLE `TankMetadata` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191),
    `volume` INT NOT NULL,
    `type` ENUM('FRESH', 'SALT', 'BRACKISH') NOT NULL,
    `qrSymbol` INT NOT NULL,
    `tanknicianSourcedOnly` BOOLEAN NOT NULL,
    `lastDateServiced` DATETIME NOT NULL,
    `customerId` INT NOT NULL,
    INDEX `TankMetadata_customerId_idx`(`customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Add foreign key constraints
ALTER TABLE `Login`
    ADD CONSTRAINT `LoginUser` FOREIGN KEY (`userId`) REFERENCES `User` (`id`);

ALTER TABLE `ServiceCall`
    ADD CONSTRAINT `ServiceCallEmployee` FOREIGN KEY (`employeeId`) REFERENCES `User` (`id`),
    ADD CONSTRAINT `ServiceCallTank` FOREIGN KEY (`tankId`) REFERENCES `TankMetadata` (`id`);

ALTER TABLE `TankMetadata`
    ADD CONSTRAINT `TankMetadataCustomer` FOREIGN KEY (`customerId`) REFERENCES `User` (`id`);
