# Tanknicians-stack

Full stack web application, mobile application, and data analysis platform for Tanknicians, LLC

Sponsor:

Tommy Yannopolous, owner/operator of [Tanknicians, LLC.](https://tanknicians.com/), located at 844 Park Ave, Lake Park, FL 33403

Developers:

- Thomas Harmeyer, _backend_
- Harry Hocker, _backend_
- Carlos Martinez, _frontend_
- Will Mitchell, _frontend_
- Justice Smith, _project manager_

Project Supervisor:

[Professor Richard Leinecker, UCF Lecturer](https://www.cecs.ucf.edu/faculty/richard-leinecker/)

Project consists of 3 major components:

1. Admin portal fed by aquarium service call data for internal company analysis.
2. Mobile application for on-site use by technicians to fulfill service call needs (recording, reporting, order placement).
3. Public-facing customer portal for records review, inventory browsing, and display of additional static content.

For developer use: Run "npm install" and "npx prisma generate" to download the dependencies and build the required models. 
Required for the Back-End: .env file with DATABASE_URL, PORT, and JWT_TOKEN