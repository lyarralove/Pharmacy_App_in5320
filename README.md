# IN5320 Project

An app to handle data about life-saving medical supplies for the DHIS2 platform.

## NB - Update
This is a copy of the In5320 final project previously uploaded to my UiO github account. Due to the wishes of a team-member it is not publically available.

This project was part of the exam in the course in5320 and the app was designed, developed and delivered in less than 6-weeks while everyone on the team also had other exams.
Please note that the code is entirely unchanged from 2023 and may contain bugs, especially due to the short development time.

## Project Description ✒️

This is a web application for the DHIS2 user case in the course IN5320 at University of Oslo. The goal with the project is to facilitate good, accurate and efficient handling of medical supplies. For this, the store manager, as the primary end user, is especially taken into account. The store manager is described with following characteristics in the course's case description:

- Might lack knowledge about logistics
- Might lack knowledge about pharmacy
- Might lack digital literacy

This project focuses on implementing a soulution with the store manager's previous work-flow and knowledge base in mind. We want to provide the store managers with the functionalities they desire.

For this, we use the Life-Saving Commodities data set from the DHIS2 demo api.  In addition, we use css, javascript and react. We have implemented the fundemental requirements and chosen the optional tasks (1) Store Management, (3) Requests commodities from nearby clinics (other orgunits), (4) Improved management of commodity recipients and (8) Analytics Dashboard.

## Functionality in This App 💻

There are five pages in the application and navigation bar: 
1. Commodities
2. Dispensing History (History)
3. Monthly Report 
4. Nearby Clinics (Internal Transfer)
5. Analytics Dashboard

Each of these have different functionalities within them:

- List commodities (Commodities)
- Register dispensed commodity (Commodities)
- List transaction history of dispensed commodities (Dispensing History)
- Find commodity stock in nearby clinics (Nearby Clinics)
- Request commodities for restock (Monthly report)
  - NB! The requested commodities come in right away
- Find a data analytics summary of dispensing history (Analytics Dashboard)
- Find a graph representation of dispensing history for commodities (Analytics Dashboard)

Optional task 4 is implemented within Commodities and utilized throughout Dispensing History as well. 


## Prerequisites 🌱

- node (e.g version 16.20.2)
- npm (e.g. version 8.19.4)
- yarn (e.g. version 1.22.19)
- dhis2 cli (e.g. version 3.9.4)
  - installation guide **[here](https://dhis2-app-course.ifi.uio.no/learn/dhis2/getting-started/development-environment/development-env-setup/)**

## How to run 🏃🏿‍♀️

1. Start the proxy (DHIS Portal) with command `npx dhis-portal --target=https://data.research.dhis2.org/in5320/`. You can test this by visiting localhost:9999 in your browser. You should be redirected to https://data.research.dhis2.org/in5320/.
2. Run `yarn start`
3. A log in page will then show up. The log-in information is:
   Username: admin
   Password: district
 
<details>
<summary>
I get "'d2-app-scripts' is not recognized as an internal or external command when I run `yarn start`"
</summary>
<br>
Run these commands in terminal:

```
yarn add --dev @dhis2/cli-app-scripts
npm install --legacy-peer-deps
```

Then try to run `yarn build` again, and it might work.

</details>

<details>
<summary>
I get `[ERROR] Failed to validate package, use --no-verify to skip these checks` when I try to build
</summary>
<br>
Try to run `yarn start`, without worrying too much about the error message. If this doesn't work, you can try these commands:
  
```console
yarn add @nivo/core @nivo/bar @nivo/line
npm update react-d3-library —legacy-peer-deps
```

</details>
<details>
<summary>
I get an error concerning nivo
</summary>
<br>
Try to add @nivo/core, @nivo/bar and @nivo/line again:
  
```console
yarn add @nivo/core @nivo/bar @nivo/line
```

</details>
