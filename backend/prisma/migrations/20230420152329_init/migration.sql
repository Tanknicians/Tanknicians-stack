-- Create the Login table
CREATE TABLE `Login` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('ADMIN', 'CUSTOMER', 'EMPLOYEE') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    UNIQUE INDEX `Login_email_key`(`email`),
    INDEX `Login_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create the User table
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL DEFAULT '',
    `middleName` VARCHAR(191) NOT NULL DEFAULT '',
    `lastName` VARCHAR(191) NOT NULL DEFAULT '',
    `address` VARCHAR(191) NOT NULL DEFAULT '',
    `phone` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT ''
    `isEmployee` BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create the ServiceCall table
CREATE TABLE `ServiceCall` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isApproved` BOOLEAN NOT NULL,
    `createdOn` DATETIME NOT NULL,
    `customerRequest` VARCHAR(191) NOT NULL DEFAULT '',
    `employeeNotes` VARCHAR(191) NOT NULL DEFAULT '',
    `notApprovedNotes` VARCHAR(191) NOT NULL DEFAULT '',
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
    `employeeId` INTEGER NOT NULL,
    `tankId` INTEGER NOT NULL,
    INDEX `ServiceCall_employeeId_idx`(`employeeId`),
    INDEX `ServiceCall_tankId_idx`(`tankId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create the TankMetadata table
CREATE TABLE `TankMetadata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(191) NOT NULL DEFAULT 'nickname',
    `volume` INTEGER NOT NULL,
    `type` ENUM('FRESH', 'SALT', 'BRACKISH') NOT NULL,
    `qrSymbol` INTEGER NOT NULL,
    `tanknicianSourcedOnly` BOOLEAN NOT NULL,
    `lastDateServiced` DATETIME NOT NULL,
    `customerId` INTEGER NOT NULL,
    INDEX `TankMetadata_customerId_idx`(`customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

