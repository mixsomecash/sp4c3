import React from 'react'
import {
  Box,
  Container,
  SimpleGrid,
  Divider,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react'
import { SocialIcons } from 'components'
import ServiceObject from './components/ServiceObject'
import ImageListItem from './components/ImageListItem'

const Home = () => {
  return (
    <Container maxW="container.lg">
      <Box fontSize="4xl" fontWeight="bold" textAlign="center" mt={24} mb={16}>
        Ethereum-based distributed storage and AI cloud computing system
      </Box>
      <Box textAlign="center">
        Join us and help expand the Ethereum ecosystem to support both financial and non-financial
        applications, using technology to connect the digital and traditional worlds to deliver real
        value for companies and individuals in different industries.
      </Box>
      <Box mt={8}>
        <SocialIcons />
      </Box>
      <Divider my={16} />
      <Box bg="gray.800" py={12} px={8} my={16} borderRadius="xl">
        <Box
          textColor="rgba(247,147,30)"
          fontSize="4xl"
          fontWeight="bold"
          textAlign="center"
          mb={12}
        >
          ABOUT SP4C3
        </Box>
        <Box fontSize="3xl" fontWeight="bold" mb={6}>
          SP4C3 is a brand new data storage and distribution network with a mission to build a
          distributed and efficient solution based on the Ethereum network.
        </Box>
        <Box fontSize="2xl" fontWeight="bold" opacity={0.5} mb={12}>
          Currently, most powerful data storage centers mainly serve the storage and use of data in
          financial institutions and banking systems.
        </Box>
        <Divider my={8} />
        <Box fontWeight="bold" mb={4}>
          At the same time, based on the distributed core of banking financial business, a highly
          scalable financial cloud and AI computing system can be built.
        </Box>
        <Box fontWeight="bold" mb={4}>
          Comprehensive open-source AI cloud computing platform will support the innovation of the
          digital financial system.
        </Box>
        <Box opacity={0.5}>
          SP4C3 will also play an important role in non-financial applications through efficient AI
          computing systems, video analysis, structured AI combinated with different algorithms of
          AI workforce to support the cloud application, including AI intelligent management,
          automatic face recognition and intelligent search and intelligent identification to help
          the landing of non-financial applications.
        </Box>
      </Box>
      <Divider my={16} />
      <Box>
        <Box
          textColor="rgba(247,147,30)"
          fontSize="4xl"
          fontWeight="bold"
          textAlign="center"
          mb={12}
        >
          APPLICATION
        </Box>
        <ImageListItem image="/img/applicationIcon1.png" header="DeFi Open Financial System">
          Supports distributed storage requirements for cross-chain atomic exchange and cross-chain
          atomic mapping. Provides support for resolving data interactions.
        </ImageListItem>
        <ImageListItem image="/img/applicationIcon2.png" header="Bank payment system">
          Cross-chain interaction with the XRP(Ripple) community to provide more efficient and
          secure data storage and data invocation for the bank payment system it serves.
        </ImageListItem>
        <ImageListItem
          image="/img/applicationIcon3.png"
          header="Cross-chain Bridge of transaction ecosystem"
        >
          It serves Binance Bridge technology to provide high-security data storage and invocation
          services, and later extends to serve other transaction systems to ensure the security and
          efficiency of data storage.
        </ImageListItem>
      </Box>
      <Divider my={16} />
      <Box bg="gray.800" py={12} px={8} my={16} borderRadius="xl">
        <Box
          textColor="rgba(247,147,30)"
          fontSize="4xl"
          fontWeight="bold"
          textAlign="center"
          mb={12}
        >
          SERVICE OBJECTS
        </Box>
        <SimpleGrid columns={[2, null, 4]}>
          <ServiceObject
            image="/img/objects/1.png"
            text="Virtual (digital) banks & digital funds"
          />
          <ServiceObject image="/img/objects/2.png" text="Digital trading platform" />
          <ServiceObject image="/img/objects/3.png" text="Digital Wallet Agency" />
          <ServiceObject image="/img/objects/4.png" text="Data Manager" />
          <ServiceObject image="/img/objects/5.png" text="Service Provider" />
          <ServiceObject image="/img/objects/6.png" text="Researcher" />
          <ServiceObject image="/img/objects/7.png" text="Government agencies" />
          <ServiceObject image="/img/objects/8.png" text="Various enterprises & organizations" />
          <ServiceObject image="/img/objects/9.png" text="Blockchain Developers" />
          <ServiceObject image="/img/objects/10.png" text="Content creators" />
          <ServiceObject image="/img/objects/11.png" text="Offline users" />
        </SimpleGrid>
      </Box>
      <Divider my={16} />
      <Box>
        <Box
          textColor="rgba(247,147,30)"
          fontSize="4xl"
          fontWeight="bold"
          textAlign="center"
          mb={12}
        >
          HOW DOES IT WORK?
        </Box>
        <Box fontSize="3xl" fontWeight="bold" textAlign="center" my={12}>
          SYSTEM ARCHITECTURE
        </Box>
        <SimpleGrid columns={[1, null, 2]} gap={8}>
          <ImageListItem
            image="/img/systemIcon1.png"
            header="A financial-grade secure data storage"
          >
            SP4C3-Box offers users financial-grade secure data storage and eases the management and
            use of data assets by providing data custody for documents such as identity cards, bank
            cards, driver’s licenses, academic credentials, real estate certificates, and financial
            statements. Enabled by multiple encryption techniques, watermarking, data escrow,
            blockchain technology and biometric verification, SP4C3-Box ensures the secure storage
            and use of data assets, which is exactly what the users need for data protection.
          </ImageListItem>
          <ImageListItem
            image="/img/systemIcon2.png"
            header="A decentralized financial message bus"
          >
            SP4C3-Bus supports diversified business calls, online meeting batches, big data
            processing scenarios, such as disaster of multicenter liveability, and provides higher
            utilization rate of the machine, flexible, smooth upgrade and expansion methods,
            unlimited capacity, with a smooth whole process service governance and tools support,
            both for the application, the bus itself and network fault isolation. It implies fast
            technological advantages, such as millisecond-level delay and 100-million-level message
            processing capacity, have helped financial companies meet challenges in an all-round
            way.
          </ImageListItem>
          <ImageListItem
            image="/img/systemIcon3.png"
            header="Distributed event-driven architecture"
          >
            SP4C3-EventDriven is a distributed event-driven architecture, EDA designed for
            preemptive, reliable, and in-time communications between complex and dynamic IT systems.
            It&apos;s an open source blockchain solution developed by SP4C3 for cross-institutional
            and cross-platform event notifications in loosely coupled systems that support the
            Collaborative Business models.
          </ImageListItem>
          <ImageListItem
            image="/img/systemIcon4.png"
            header="Simplifyied IT management for distributed architecture"
          >
            These days applications are growing into giant beasts while microservices are turning
            swarms. Regardless of your technology stack, the complexity of infrastructure in your
            organization will keep growing until it exhausts your employees. With SP4C3 Cube, you
            can now concentrate on doing your business rather than managing your infrastructures.
          </ImageListItem>
          <ImageListItem
            image="/img/systemIcon5.png"
            header="A one-stop, seamless experience, financial grade, and open source big data platform suite"
          >
            The SP4C3 Date Sphere suite consists of 3 layers: the function layer, the middleware
            layer, and the basic layer.
          </ImageListItem>
        </SimpleGrid>
        <Box fontSize="3xl" fontWeight="bold" textAlign="center" mt={16} mb={12}>
          DISTRIBUTED STORAGE SERVICE
        </Box>
        <Box textAlign="center">
          SP4C3 Distributed Storage Service (DSS) provides you with dedicated storage pools which
          are physically isolated from other pools to ensure high security. With data redundancy and
          cache acceleration technologies, DSS delivers highly reliable, durable, low-latency, and
          stable storage resources. By flexibly interconnecting with various compute services, such
          as Dedicated Computing Cluster (DCC), Elastic Cloud Server (ECS) and Bare Metal Server
          (BMS), DSS is suitable for different scenarios, including high performance computing
          (HPC), online analytical processing (OLAP), and mixed loads.
        </Box>
        <SimpleGrid columns={[1, null, 2]} gap={8} my={8}>
          <ImageListItem image="/img/serviceIcon1.png" header="Verifiable storage">
            Sp4ac3 verifies if the user&apos;s data is being stored with encrypted authentication
            without relying on the cloud storage provider or other intermediates.
          </ImageListItem>
          <ImageListItem image="/img/serviceIcon2.png" header="Open Participation">
            Any party with the required hardware system and access to the Internet can participate
            in Sp4ac3 system
          </ImageListItem>
          <ImageListItem
            image="/img/serviceIcon3.png"
            header="Storage distribution can be locally optimized"
          >
            Driven by open participation, market power in the Sp4ac3 economy can deliver information
            and data more efficiently than a centralized storage platform, and the network will have
            faster response times.
          </ImageListItem>
          <ImageListItem image="/img/serviceIcon4.png" header="Flexible Storage Options">
            As an open platform, Sp4c3 will support many additional tools and ancillary services and
            payments through different blockchains(Bitcoin, Ethereum, Ripple)
          </ImageListItem>
          <ImageListItem
            image="/img/serviceIcon5.png"
            header="The network is built by the community"
          >
            SP4C3 gives Ethereum network participants the opportunity to become stakeholders in the
            success of the network, and the network will grow stronger as a result. SP4C3
            participants will benefit by working together to improve the Ethereum network.
          </ImageListItem>
          <ImageListItem image="/img/serviceIcon6.png" header="Cross-chain support">
            Sp4c3 will be based on cross-chain agreements with more partners, using blockchain
            bridges and on demand expansions
          </ImageListItem>
          <ImageListItem
            image="/img/serviceIcon7.png"
            header="Support for non-financial applications"
          >
            through the AI computing space, to access the video and supervisory resources that
            connected to the AI computing, according to different types of applications combined
            with different algorithms, provide intelligent monitoring and identification, and
            through the system warning, to solve different types of needs.
          </ImageListItem>
        </SimpleGrid>
        <Box fontSize="3xl" fontWeight="bold" textAlign="center" mt={16} mb={12}>
          AI CLOUD COMPUTING
        </Box>
        <ImageListItem image="/img/computingIcon1.png" header="AI computing chip, hardware support">
          will use the intelligent server supported by AI intelligent chip, greatly reducing the
          difficulty and cost of distributed storage related AI application development, while
          supporting the continuous iteration of the algorithm, greatly improving the analysis and
          invocation of distributed storage data, and the efficiency of data interaction.
        </ImageListItem>
      </Box>
      <Divider my={16} />
      <Box bg="gray.800" py={12} px={8} my={16} borderRadius="xl">
        <Box
          textColor="rgba(247,147,30)"
          fontSize="4xl"
          fontWeight="bold"
          textAlign="center"
          mb={12}
        >
          ROADMAP
        </Box>
        <Box fontSize="2xl" fontWeight="bold" mb={4}>
          2022
        </Box>
        <Tabs variant="unstyled">
          <TabList>
            {['Q1', 'Q2', 'Q3', 'Q4'].map(tabLabel => (
              <Tab
                borderRadius="xl"
                fontWeight="bold"
                _selected={{ color: 'black', bg: 'rgba(247,147,30)' }}
              >
                {tabLabel}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box py={2}>1. Version1 of the storage and computer testing network is online.</Box>
              <Box py={2}>
                2. Released version 1.0 of A financial-grade secure data storage, Decentralized
                Financial Message Bus, Distributed event-driven architecture, Simplify IT management
                for distributed architecture, and A one-stop, seamless experience, financial grade,
                and open source big data platform suite, and completed open source.
              </Box>
              <Box py={2}>
                3. Ethereum & Ripple and other multi-chain cross-chain protocols to test network
                interaction.
              </Box>
              <Box py={2}>
                4. Start the process of launching Coinbase, submit the application and relevant
                materials.
              </Box>
            </TabPanel>
            <TabPanel>
              <Box py={2}>
                1. SP4C3 global hardware SP4C3 node construction and test network to assist
                operation.
              </Box>
              <Box py={2}>
                2. DAO members confirming and carrying out the first community autonomy vote.
              </Box>
              <Box py={2}>
                3. Starting the docking of data storage and computing technology support between
                banks and financial institutions.
              </Box>
              <Box py={2}>
                4. Initiating the plan of establishing a laboratory jointly with the hardware
                support organization to ensure the iterative coupling degree between hardware and
                software
              </Box>
            </TabPanel>
            <TabPanel>
              <Box py={2}>1. SP4C3 main network launching.</Box>
              <Box py={2}>
                2. Ethereum & Ripple and other multi-chain cross-chain protocol Bridge building.
              </Box>
              <Box py={2}>
                3. The data storage and computing service system of banks and financial institutions
                goes online.
              </Box>
              <Box py={2}>
                4. SP4C3 providing relevant Data to hardware partners, conducting technology
                docking, taking distributed storage and AI cloud computing as the core direction of
                research and development, and obtains hardware iteration support.
              </Box>
              <Box py={2}>
                5. Starting capital operation and announce IPO plan.(The plan will also be
                considered in the form of SPAC)
              </Box>
            </TabPanel>
            <TabPanel>
              <Box py={2}>
                1. Release the iteration plan for launching SP4C3 main network (including software
                system upgrade, hardware support iteration test Data, etc.)
              </Box>
              <Box py={2}>
                2. Officially launched Coinbase and started secondary market trading on other
                mainstream trading platforms.
              </Box>
              <Box py={2}>
                3. Start the asset securitization business in the project capital market.
              </Box>
              <Box py={2}>
                4. Update the project progress report quarterly, and release the project planning
                and core objectives for the next year
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Home
