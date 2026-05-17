import React, { useState, useRef } from 'react'
import { 
  Box, Heading, Text, Container, VStack, HStack, Link, 
  Divider, Badge, SimpleGrid, Flex, IconButton, Button, 
  useColorMode, useColorModeValue, Tooltip, Modal, ModalOverlay,
  ModalContent, ModalBody, ModalCloseButton, useDisclosure
} from '@chakra-ui/react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { FaPlay, FaEnvelope, FaGithub, FaFileAlt, FaFigma, FaPython, FaReact, FaDocker, FaJs, FaMicrosoft, FaLinux, FaTerminal, FaGitAlt, FaHtml5, FaCss3Alt, FaDatabase } from 'react-icons/fa'
import { SiCanva, SiKubernetes, SiPostgresql, SiFastapi, SiSharp, SiDotnet, SiNeo4J } from 'react-icons/si'

// --- CONSTANTS ---
const mauveAccent = "#654F69";

// --- ANIMATION ---
const FadeIn = ({ children }) => (
    <motion.div
      style={{ width:"100%"}}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      viewport={{ amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
);

// --- 1. AD GALLERY COMPONENT ---
const AdGallery = ({ assets }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState(null);

  return (
    <SimpleGrid columns={[2, 4]} spacing={4} mt={6}>
      {assets.map((asset, i) => (
        <Box 
          key={i} 
          position="relative"
          cursor="pointer" 
          onClick={() => { setSelected(asset); onOpen(); }}
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "whiteAlpha.200")}
          _hover={{ transform: "scale(1.03)", borderColor: mauveAccent }}
          transition="0.2s"
          overflow="hidden"
          bg="black"
          height="150px"
        >
          {/* Check if thumbnail is an mp4; if so, we can't use <img> */}
          {asset.thumbnail && !asset.thumbnail.endsWith('.mp4') ? (
            <img src={asset.thumbnail} alt="Asset thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <Flex align="center" justify="center" h="100%" bg="gray.800">
               <Text fontSize="10px" color="whiteAlpha.500">VIDEO_PREVIEW</Text>
            </Flex>
          )}
          
          {asset.type === 'video' && (
            <Flex position="absolute" inset="0" align="center" justify="center" bg="blackAlpha.400">
              <FaPlay size="20px" color="white" />
            </Flex>
          )}
        </Box>
      ))}

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="black" overflow="hidden">
          <ModalCloseButton color="white" zIndex="modal" />
          <ModalBody p={0}>
            {selected?.type === 'video' ? (
              <video autoPlay loop muted playsInline style={{ width: '100%' }}>
                <source src={selected.src} type="video/mp4" />
              </video>
            ) : (
              <img src={selected?.src} alt="Full asset" style={{ width: '100%' }} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </SimpleGrid>
  );
};

// --- 2. PROJECT ROW COMPONENT ---
const ProjectRow = ({ title, description, videoSrc, tags, link }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const videoRef = useRef(null);
  const hoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const headingColor = useColorModeValue("#1A202C", "white");
  const silverText = useColorModeValue("#4A5568", "#BCC6CC");

  return (
    <>
      <Box 
        onClick={onOpen}
        cursor="pointer"
        p={4}
        borderRadius="md"
        transition="all 0.2s"
        borderLeft="4px solid"
        borderColor={useColorModeValue("gray.200", "whiteAlpha.200")}
        _hover={{ borderColor: mauveAccent, bg: hoverBg, transform: "translateX(5px)" }}
      >
        <Flex justify="space-between" align="center">
          <Heading size="md" color={headingColor}>{title}</Heading>
          <HStack>
            {link && (
              <Link href={link} isExternal fontSize="12px" fontWeight="bold" color={mauveAccent} mr={4} onClick={(e) => e.stopPropagation()} _hover={{ textDecoration: "underline" }}>
                [VISIT_SITE]
              </Link>
            )}
            <Text fontSize="12px" fontWeight="bold" color={mauveAccent} opacity={0.6}>
              [WATCH_DEMO]
            </Text>
          </HStack>
        </Flex>
        
        <Text fontSize="sm" mt={2} mb={4} maxW="80%" color={silverText}>{description}</Text>
        
        <HStack spacing={4} color={silverText}>
          {tags.map((Icon, i) => <Icon key={i} size="18px" />)}
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={() => { videoRef.current?.pause(); onClose(); }} size="4xl" isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="black">
          <ModalCloseButton color="white" />
          <ModalBody p={0}>
            <video ref={videoRef} autoPlay loop muted playsInline style={{ width: '100%', imageRendering: 'crisp-edges' }}>
              <source src={videoSrc} type="video/mp4" />
            </video>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

// --- 3. MARKETING PROJECT ROW ---
const MarketingProjectRow = ({ title, description, assets }) => {
  const headingColor = useColorModeValue("#1A202C", "white");
  const borderColor = useColorModeValue("gray.300", "whiteAlpha.200");

  return (
    <Box 
      p={4}
      borderRadius="md"
      borderLeft="4px solid"
      borderColor={borderColor}
      bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
    >
      <Heading size="md" color={headingColor}>{title}</Heading>
      <Text fontSize="sm" mt={2} mb={4} maxW="80%" fontStyle="italic">
        {description}
      </Text>
      <AdGallery assets={assets} />
    </Box>
  );
};

// --- MAIN APP ---
function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const [filter, setFilter] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDownloading, setIsDownloading] = useState(false);

  const silverText = useColorModeValue("#4A5568", "#BCC6CC")
  const bgColor = useColorModeValue("#d8d5db", "#151518")
  const headingColor = useColorModeValue("#1A202C", "white")
  const borderColor = useColorModeValue("gray.300", "whiteAlpha.200")

  const myStack = [
    { icon: SiCanva, label: "CANVA" }, { icon: FaReact, label: "REACT" },
    { icon: FaJs, label: "JAVASCRIPT" }, { icon: FaPython, label: "PYTHON" },
    { icon: FaHtml5, label: "HTML" }, { icon: FaCss3Alt, label: "CSS" },
    { icon: SiSharp, label: "C#" }, { icon: SiPostgresql, label: "SQL" },
    { icon: FaTerminal, label: "BASH" }, { icon: SiFastapi, label: "FASTAPI" },
    { icon: SiDotnet, label: ".NET" }, { icon: FaDocker, label: "DOCKER" },
    { icon: SiKubernetes, label: "K8S" }, { icon: SiNeo4J, label: "NEO4J" },
    { icon: FaGitAlt, label: "GIT" }, { icon: FaLinux, label: "LINUX" },
    { icon: FaMicrosoft, label: "Office" }, 
  ];

  const certifications = [
    { name: "A+", org: "CompTIA" }, { name: "Network+", org: "CompTIA" },
    { name: "Security+", org: "CompTIA" }, { name: "Project+", org: "CompTIA" },
    { name: "Certified Cloud Practitioner", org: "AWS" },
  ];

  return (
    <Box bg={bgColor} color={silverText} minH="100vh" transition="0.5s ease">
      <motion.div style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '5px', background: mauveAccent, transformOrigin: '0%', zIndex: 1000 }} />

      <Container maxW="container.md" py={20}>
        <Flex justify="flex-end" mb={10}>
          <IconButton variant="ghost" color={silverText} _hover={{ bg: borderColor }} aria-label="Toggle Theme" icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode} />
        </Flex>

        <VStack spacing={20} align="stretch">
          
          <FadeIn>
            <Box as="header">
              <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color={mauveAccent} mb={4}>SYSTEMS_ACTIVE // AC_PORTFOLIO</Text>
              <Heading size="2xl" fontWeight="800" mb={2} color={headingColor}>Adriana Canedo</Heading>
              <Text fontSize="xl" fontWeight="medium" color={silverText} mb={3}>Software Engineer & UI/UX Design Analyst</Text>              
              <HStack spacing={8} mt={7} mb={-4} color={mauveAccent}>
                <Tooltip label="Email"><Link href="mailto:acanedo@wgu.edu" _hover={{ color: headingColor }}><FaEnvelope size="24px" /></Link></Tooltip>                
                <Tooltip label="GitHub"><Link href="https://github.com/acanedo13" isExternal _hover={{ color: headingColor }}><FaGithub size="24px" /></Link></Tooltip>
                <Tooltip label="Resume">
                  <Button variant="ghost" color={mauveAccent} isLoading={isDownloading} onClick={() => { setIsDownloading(true); setTimeout(() => { setIsDownloading(false); onOpen(); }, 1500); }} _hover={{ bg: "transparent", color: headingColor }} px={0}><FaFileAlt size="24px" /></Button>
                </Tooltip>                       
              </HStack>
              <Modal isOpen={isOpen} onClose={onClose} size="6xl">
                <ModalOverlay backdropFilter="blur(5px)" />
                <ModalContent h="90vh" bg="blackAlpha.900">
                  <ModalCloseButton color="white" />
                  <ModalBody p={0}><iframe src="/Adriana_Canedo_Resume.pdf" width="100%" height="100%" title="Resume" /></ModalBody>
                </ModalContent>
              </Modal>    
            </Box>
          </FadeIn>

          <FadeIn>
            <Box as="section">
              <Text fontSize="lg" lineHeight="1.8" mb={7}>With nearly two decades of experience in global signals intelligence and defensive cyber operations, I have built a career on translating 'white noise' into actionable strategy and bringing order to chaos. My current work at Carnegie Mellon University focuses on bridging the gap between complex intelligence analysis and scalable, cloud-native architecture.</Text>                
              <Text fontSize="lg" lineHeight="1.8" mb={7}>While my background is rooted in mission-critical systems, my true passion lies in UI/UX design and functional aesthetics. I believe that a system is only as effective as the human who uses it, which is why I am dedicated to human-centric design. I approach software through the lens of a design analyst: building interfaces that are as organized as they are powerful.</Text>    
              <Text fontSize="lg" textAlign="center" fontStyle="italic" mt={1} mb={10}>"I believe in systems that are as organized as they are powerful."</Text>              
            </Box>
          </FadeIn>

          <FadeIn>
            <Box as="section">
              <Text fontSize="sm" fontWeight="mono" color={mauveAccent} mb={5} letterSpacing="widest" sx={{"::before": { content: '"root@adriana:~# "' }}}>CORE_STACK</Text>
              <Box mb={10}>
                <input type="text" placeholder="grep the core stack" onChange={(e) => setFilter(e.target.value)} style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #654F69', color: 'inherit', width: '100%', padding: '8px 0', outline: 'none' }} />
              </Box>
              <SimpleGrid columns={[3, 6]} spacing={10}>
                {myStack.filter(item => item.label.includes(filter.toUpperCase())).map((item, index) => (
                    <VStack key={index} align="center" spacing={3}><item.icon size="30px" color={silverText} /><Text fontSize="xs" fontWeight="bold">{item.label}</Text></VStack>
                ))}
              </SimpleGrid>
              <Text fontSize="sm" fontWeight="mono" color={mauveAccent} mt={20} mb={10} letterSpacing="widest" sx={{"::before": { content: '"root@adriana:~# "' }}}>CERTIFICATIONS</Text>
              <VStack align="start" spacing={2} mt={6} fontFamily="monospace">
                {certifications.map((cert) => (
                  <Text key={cert.name} fontSize="xs" color={silverText}><span style={{ color: 'darkgreen' }}>[SUCCESS]</span> Loading {cert.org}_{cert.name.replace(/\s+/g, '_')} ...</Text>
                ))}
              </VStack>
            </Box>
          </FadeIn>

          <Divider borderColor={borderColor} borderBottomWidth="3px" my={3} />

          <FadeIn>
            <Box as="section">
              <Text fontSize="sm" fontWeight="mono" color={mauveAccent} mt={5} mb={10} letterSpacing="widest" sx={{"::before": { content: '"root@adriana:~# "' }}}>PROJECT_ARCHIVE</Text>
              <VStack spacing={8} align="stretch">
                <ProjectRow title="DoD Research Identification Tool" description="Lead Design Developer. Designed core UI architecture and brand identity for a high-fidelity RAG application powered by Python and Neo4j." videoSrc="/Aegis_Scholar_Demo.mp4" tags={[FaDatabase, FaPython, SiCanva, FaDocker]} />
                <ProjectRow title="Owl-ternative | Digital Community" description="Brand Architect & Lead Developer. Engineered a bespoke, anonymous submission archive, overcoming core Shopify constraints for asynchronous user content." videoSrc="/owl-ternative_demo.mp4" tags={[FaHtml5, FaCss3Alt, SiCanva]} link="https://owl-ternative.com" />
              </VStack>
            </Box>
          </FadeIn>

          <FadeIn>
            <Box as="section">
              <Text fontSize="sm" fontWeight="mono" color={mauveAccent} mb={10} letterSpacing="widest" sx={{"::before": { content: '"root@adriana:~# "' }}}>MARKETING_ASSETS_ARCHIVE</Text>
              <MarketingProjectRow 
                title="Strategic Design & Visual Identity" 
                description="A collection of wireframes, digital marketing assets, and ad campaigns designed to bridge brand identity with functional UX."
                assets={[
                  { src: "/Wireframe.png", thumbnail: "/Wireframe.png", type: "image" },
                  { src: "/WireframeFlowChart.png", thumbnail: "/WireframeFlowChart.png", type: "image" },
                  { src: "/FriendshipFavor.png", thumbnail: "/FriendshipFavor.png", type: "image" },
                  { src: "/PokemonInviteFront.png", thumbnail: "/PokemonInviteFront.png", type: "image" },
                  { src: "/ChatAd.mp4", thumbnail: null, type: "video" },
                  { src: "/CollectionsAd.mp4", thumbnail: null, type: "video" }
                ]} 
              />
            </Box>
          </FadeIn>
          
          <Divider borderColor={borderColor} borderBottomWidth="3px" my={3} />

          <FadeIn>
            <Box as="section">
              <Text fontSize="sm" fontWeight="mono" color={mauveAccent} mt={5} mb={10} letterSpacing="widest" sx={{"::before": { content: '"root@adriana:~# "' }}}>EXPERIENCE</Text>
              <Box mb={6}>
                <Flex justify="space-between" align="baseline" mb={1}><Text fontWeight="bold" fontSize="lg" color={headingColor}>Project Management & Strategic Leadership</Text><Text fontSize="xs" color="gray.500">2009 — Present</Text></Flex>
                <Text fontSize="sm" color={mauveAccent} fontWeight="bold" mb={2}>U.S. DEPARTMENT OF DEFENSE</Text>
                <Text fontSize="m">Managed multimillion-dollar asset portfolios and led multidisciplinary teams in high-pressure environments.</Text>
              </Box>
              <Box mb={6}>
                <Flex justify="space-between" align="baseline" mb={1}><Text fontWeight="bold" fontSize="lg" color={headingColor}>Artificial Intelligence Tech</Text><Text fontSize="xs" color="gray.500">2025 — Present</Text></Flex>
                <Text fontSize="sm" color={mauveAccent} fontWeight="bold" mb={2}>CMU / AIIC</Text>
                <Text fontSize="m">Specializing in building scalable, cloud-native environments for complex data problems.</Text>
              </Box>
            </Box>
          </FadeIn>

          <FadeIn>
            <Box as="footer" pt={10} pb={10}>
              <Flex justify="space-between" align="center" direction={['column', 'row']} gap={4}>
                <Text fontSize="10px" color="gray.500">© ADRIANA CANEDO {new Date().getFullYear()}</Text>
                <HStack spacing={4}>
                  <Badge variant="outline" color={mauveAccent} borderColor={mauveAccent}>V.1.2.5</Badge>
                  <Badge variant="outline" color={mauveAccent} borderColor={mauveAccent}>ENCRYPTED</Badge>
                </HStack>
              </Flex>
            </Box>
          </FadeIn>

        </VStack>
      </Container>
    </Box>
  )
}

export default App