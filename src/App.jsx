import React, { useState, useRef } from 'react'
import { 
  Box, Heading, Text, Container, VStack, HStack, Link, 
  Divider, Badge, SimpleGrid, Flex, IconButton, Button, 
  useColorMode, useColorModeValue, Tooltip, Modal, ModalOverlay,
  ModalContent, ModalBody, ModalCloseButton, useDisclosure, Image
} from '@chakra-ui/react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { FaChevronRight, FaChevronLeft, FaPlay, FaEnvelope, FaGithub, FaFileAlt, FaFigma, FaPython, FaReact, FaDocker, FaJs, FaMicrosoft, FaLinux, FaTerminal, FaGitAlt, FaHtml5, FaCss3Alt, FaDatabase } from 'react-icons/fa'
import { SiCanva, SiKubernetes, SiPostgresql, SiFastapi, SiSharp, SiDotnet, SiNeo4J } from 'react-icons/si'


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

const AdGallery = ({ assets }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState(null);
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Box position="relative" mt={6} w="100%">
      {/* Left Scroll Arrow */}
      <IconButton
        icon={<FaChevronLeft />}
        position="absolute"
        left="-15px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
        onClick={() => scroll('left')}
        rounded="full"
        size="sm"
        aria-label="Scroll left"
        boxShadow="md"
      />

      {/* Carousel Container */}
      <Flex 
        ref={carouselRef}
        overflowX="auto" 
        gap={4} 
        pb={4}
        px={2}
        scrollSnapType="x mandatory"
        sx={{
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {assets.map((asset, i) => (
          <Box 
            key={i} 
            position="relative"
            cursor="pointer" 
            onClick={() => { setSelected(asset); onOpen(); }}
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "whiteAlpha.200")}
            _hover={{ transform: "scale(1.03)", borderColor: "#654F69" }}
            transition="0.2s"
            overflow="hidden"
            borderRadius="md"
            minW={["160px", "200px"]} 
            h={["160px", "200px"]}
            flexShrink={0}
            scrollSnapAlign="start"
            bg="blackAlpha.200"
          >
            {/* THUMBNAILS: Using Chakra's Image component so fallbackSrc works perfectly */}
            <Image 
              src={asset.thumbnail || asset.src} 
              alt="Asset thumbnail" 
              w="100%" 
              h="100%" 
              objectFit="cover" 
              fallbackSrc="https://via.placeholder.com/200?text=Image+Not+Found" 
            />
            
            {/* Play icon overlay for videos */}
            {asset.type === 'video' && (
              <Flex position="absolute" inset="0" align="center" justify="center" bg="blackAlpha.400" transition="0.2s" _hover={{ bg: "blackAlpha.200" }}>
                <FaPlay size="24px" color="white" />
              </Flex>
            )}
          </Box>
        ))}
      </Flex>

      {/* Right Scroll Arrow */}
      <IconButton
        icon={<FaChevronRight />}
        position="absolute"
        right="-15px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
        onClick={() => scroll('right')}
        rounded="full"
        size="sm"
        aria-label="Scroll right"
        boxShadow="md"
      />

      {/* Asset Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="black" overflow="hidden">
          <ModalCloseButton color="white" zIndex={2} />
          <ModalBody p={0} display="flex" justifyContent="center">
            {selected?.type === 'video' ? (
              <video key={selected.src} autoPlay loop controls playsInline style={{ width: '100%', maxHeight: '80vh' }}>
                <source src={selected.src} type="video/mp4" />
              </video>
            ) : (
              <Image src={selected?.src} alt="Full asset" style={{ maxHeight: '80vh', objectFit: 'contain' }} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};


  {/* --- THE PROJECT ROW COMPONENT --- */}
const ProjectRow = ({ title, description, videoSrc, tags, link }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const videoRef = useRef(null);
  const hoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const mauveAccent = "#654F69";
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
        _hover={{ borderColor: "#654F69", bg: hoverBg, transform: "translateX(5px)" }}
      >
        <Flex justify="space-between" align="center">
          <Heading size="md" color={useColorModeValue("gray.800", "white")}>{title}</Heading>
          <HStack>
            {link && (
              <Link href={link} isExternal fontSize="12px" fontWeight="bold" color={mauveAccent} mr={4} _hover={{ textDecoration: "underline" }}>
                [VISIT_SITE]
              </Link>
            )}
            <Text fontSize="12px" fontWeight="bold" color={mauveAccent} opacity={0.6} className="play-hint">
              [WATCH_DEMO]
            </Text>
          </HStack>
        </Flex>
        
        <Text fontSize="sm" mt={2} mb={4} maxW="80%">{description}</Text>
        
        <HStack spacing={4} color={silverText}>
          {tags.map((Icon, i) => <Icon key={i} size="18px" />)}
        </HStack>
      </Box>

      {/* Modal for Video */}
      <Modal isOpen={isOpen} onClose={() => {
            videoRef.current?.pause(); onClose();}} size="4xl" isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="black">
          <ModalCloseButton color="white" />
          <ModalBody p={0}>
            <video ref={videoRef} autoPlay loop muted playsInline style={{ width: '100%', imageRendering: 'crisp-edges'
             }}>
              <source src={videoSrc} type="video/mp4" />
            </video>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const MarketingProjectRow = ({ title, description, assets }) => {
  // Moved these inside the component so they resolve correctly
  const borderColor = useColorModeValue("gray.300", "whiteAlpha.200");
  const headingColor = useColorModeValue("#1A202C", "white");

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
      
      {/* The Gallery sits directly inside the row */}
      <AdGallery assets={assets} />
    </Box>
  );
};

// Animation Wrapper
function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const [filter, setFilter] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDownloading, setIsDownloading] = useState(false);

  const mauveAccent = "#654F69"
  const silverText = useColorModeValue("#4A5568", "#BCC6CC")
  const bgColor = useColorModeValue("#d8d5db", "#151518")
  const headingColor = useColorModeValue("#1A202C", "white")
  const borderColor = useColorModeValue("gray.300", "whiteAlpha.200")

  const myStack = [
    { icon: SiCanva, label: "CANVA" }, 
    { icon: FaReact, label: "REACT" },
    { icon: FaJs, label: "JAVASCRIPT" }, 
    { icon: FaPython, label: "PYTHON" },
    { icon: FaHtml5, label: "HTML" }, 
    { icon: FaCss3Alt, label: "CSS" },
    { icon: SiSharp, label: "C#" }, 
    { icon: SiPostgresql, label: "SQL" },
    { icon: FaTerminal, label: "BASH" }, 
    { icon: SiFastapi, label: "FASTAPI" },
    { icon: SiDotnet, label: ".NET" }, 
    { icon: FaDocker, label: "DOCKER" },
    { icon: SiKubernetes, label: "K8S" }, 
    { icon: SiNeo4J, label: "NEO4J" },
    { icon: FaGitAlt, label: "GIT" }, 
    { icon: FaLinux, label: "LINUX" },
    { icon: FaMicrosoft, label: "Office" }, 
  ];

  const certifications = [
  { name: "A+", org: "CompTIA" },
  { name: "Network+", org: "CompTIA" },
  { name: "Security+", org: "CompTIA" },
  { name: "Project+", org: "CompTIA" },
  { name: "Certified Cloud Practitioner", org: "AWS" },
  
];

  return (
    <Box bg={bgColor} color={silverText} minH="100vh" transition="0.5s ease">
      
      {/* Reading Progress Bar */}
      <motion.div style={{ 
        scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '5px', 
        background: mauveAccent, transformOrigin: '0%', zIndex: 1000 
      }} />

      <Container maxW="container.md" py={20}>
        
        <Flex justify="flex-end" mb={10}>
          <IconButton
            variant="ghost"
            color={silverText}
            _hover={{ bg: borderColor }}
            aria-label="Toggle Theme"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
        </Flex>

        <VStack spacing={20} align="stretch">
          
          {/* --- About --- */}
          <FadeIn>
            <Box as="header">
              <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color={mauveAccent} mb={4}>
                SYSTEMS_ACTIVE // AC_PORTFOLIO
              </Text>
              <Heading size="2xl" fontWeight="800" letterSpacing="-.0.04em" mb={2} color={headingColor}>
                Adriana Canedo
              </Heading>
              <Text fontSize="xl" fontWeight="medium" color={silverText} mb={3} >
                Software Engineer & UI/UX Design Analyst
              </Text>              
              <HStack spacing={8} mt={7} mb = {-4} color={mauveAccent}>
                <Tooltip label="Email" aria-label="Email Tooltip" openDelay={300}>
                  <Link href="mailto:acanedo@wgu.edu" aria-label="Email" _hover={{ color: headingColor }}>
                    <FaEnvelope size="24px" />
                  </Link>
                </Tooltip>                
                <Tooltip label="GitHub" aria-label="GitHub Tooltip" openDelay={300}><Link href="https://github.com/acanedo13" isExternal aria-label="GitHub" _hover={{ color: headingColor }}><FaGithub size="24px" /></Link></Tooltip>
                <Tooltip label="Resume" aria-label="Resume Tooltip">
                  <Button
                    variant="ghost"
                    color={mauveAccent}
                    isLoading={isDownloading}
                    loadingText="MOUNTING_RESUME"
                    onClick={() => {
                      setIsDownloading(true);
                      setTimeout(() => {
                        setIsDownloading(false);
                        onOpen();
                      }, 1500);
                    }}
                    _hover={{ bg: "transparent", color: headingColor }}
                    px={0}
                  >
                    <FaFileAlt size="24px" />
                  </Button>
                </Tooltip>                       
              </HStack>
          {/* --- PDF MODAL --- */}
              <Modal isOpen={isOpen} onClose={onClose} size="6xl">
                <ModalOverlay backdropFilter="blur(5px)" />
                <ModalContent h="90vh" bg="blackAlpha.900">
                  <ModalCloseButton color="white" />
                  <ModalBody p={0}>
                    {/* The browser handles the PDF print/download UI for this iframe */}
                    <iframe 
                      src="/Adriana_Canedo_Resume.pdf" 
                      width="100%" 
                      height="100%" 
                      title="Resume" 
                    />
                  </ModalBody>
                </ModalContent>
              </Modal>    
        </Box>
          </FadeIn>

          {/* --- ABOUT --- */}
          <FadeIn>
            <Box as="section">
              <Text fontSize="lg" lineHeight="1.8" mt={-3} mb={7}>
                With nearly two decades of experience in global signals intelligence and defensive cyber operations, I have built a career on translating 'white noise' into actionable strategy and bringing order to chaos. My current work at Carnegie Mellon University focuses on bridging the gap between complex intelligence analysis and scalable, cloud-native architecture.              </Text>                
              <Text fontSize="lg" lineHeight="1.8" mb={7}>
                While my background is rooted in mission-critical systems, my true passion lies in UI/UX design and functional aesthetics. I believe that a system is only as effective as the human who uses it, which is why I am dedicated to human-centric design. I approach software through the lens of a design analyst: building interfaces that are as organized as they are powerful, turning complex data into intuitive, visual experiences.
              </Text>    
              <Text fontSize="lg" lineHeight="1.8" mb={10}>
                My professional philosophy is built on technical curiosity and resilience: if I don’t know it yet, I will figure it out.              
              </Text> 
              <Text fontSize="lg" textAlign="center" fontStyle="italic" mt={1} mb={10}>"I believe in systems that are as organized as they are powerful."</Text>              
           
            </Box>
          </FadeIn>

           {/* --- CAPABILITIES --- */}
          <FadeIn>
            <Box as="section">
              <Text fontSize="sm" fontWeight="mono" color={mauveAccent} mb={5} letterSpacing="widest" sx={{"::before": { content: '"root@adriana:~# "'}, "::after": { content: '"_"', animation: "blink 1s infinite" }}}>
                CORE_STACK
              </Text>
              <style>{`
                @keyframes blink { 50% { opacity: 0; } }
              `}</style>
              
              {/* Cleaned up Search Input */}
              <Box mb={10}>
                <input 
                  type="text" 
                  placeholder="grep the core stack"
                  onChange={(e) => setFilter(e.target.value)}
                  style={{ 
                    background: 'transparent', 
                    border: 'none',
                    borderBottom: '1px solid #654F69', 
                    color: 'inherit', 
                    width: '100%',
                    padding: '8px 0',
                    outline: 'none'
                  }} 
                />
              </Box>

              <SimpleGrid columns={[3, 6]} spacing={10}>
                {myStack
                  .filter(item => item.label.includes(filter.toUpperCase()))
                  .map((item, index) => (
                    <VStack key={index} align="center" spacing={3}>
                      <item.icon size="30px" color={silverText} />
                      <Text fontSize="xs" fontWeight="bold">{item.label}</Text>
                    </VStack>
                ))}
              </SimpleGrid>
            
              <Text fontSize="sm" fontWeight="mono" color={mauveAccent} mt= {20} mb={10} letterSpacing="widest"sx={{"::before": { content: '"root@adriana:~# "' }, "::after": { content: '"_"', animation: "blink 1s infinite" }}}>CERTIFICATIONS</Text>
                <style>{`
                @keyframes blink { 50% { opacity: 0; } }
              `}</style>
              
              <VStack align="start" spacing={2} mt={6} fontFamily="monospace">
                {certifications.map((cert) => (
                  <Text key={cert.name} fontSize="xs" color={silverText}>
                    <span style={{ color: 'darkgreen' }}>[SUCCESS]</span> Loading {cert.org}_{cert.name.replace(/\s+/g, '_')} ...
                  </Text>
                ))}
              </VStack>
            </Box>
          </FadeIn>

          <Divider borderColor={borderColor} borderBottomWidth="3px" my={3} />

          {/* --- FEATURED PROJECTS --- */}
          <FadeIn>
            <Box as="section">
              <Text fontSize="sm" fontWeight="mono" color={mauveAccent} mt= {5} mb={10} letterSpacing="widest"sx={{"::before": { content: '"root@adriana:~# "' }, "::after": { content: '"_"', animation: "blink 1s infinite" }}}>PROJECT_ARCHIVE</Text>
                <style>{`
                @keyframes blink { 50% { opacity: 0; } }
              `}</style>
              
              <VStack spacing={8} align="stretch">
                <ProjectRow 
                  title="DoD Research Identification Tool"
                  description="Lead Design Developer. Designed and executed the core UI architecture and brand identity—including the official product logo—for a high-fidelity, powerful Retrieval-Augmented Generation (RAG) application powered by Python and Neo4j."
                  videoSrc="/Aegis_Scholar_Demo.mp4"
                  tags={[FaDatabase, FaPython, SiCanva, FaDocker]}
                />
                <ProjectRow 
                  title="Owl-ternative | Digital Community"
                  description="Brand Architect & Lead Developer. Delivered a fully bespoke e-commerce experience from concept to launch. Key achievement: Engineered a sophisticated, custom anonymous submission archive. Overcame core Shopify constraints to implement a highly complex backend-to-UI pipeline for asynchronous user-generated content."
                  videoSrc="/owl-ternative_demo.mp4" 
                  tags={[FaHtml5, FaCss3Alt, SiCanva]}
                  link="https://owl-ternative.com" 
                />
              </VStack>
            </Box>
          </FadeIn>

           <FadeIn>
            <Box as="section">
              <Text fontSize="sm" fontWeight="mono" color={mauveAccent} mt= {5} mb={10} letterSpacing="widest"sx={{"::before": { content: '"root@adriana:~# "' }, "::after": { content: '"_"', animation: "blink 1s infinite" }}}>ASSETS_ARCHIVE</Text>
                              <style>{`
                              @keyframes blink { 50% { opacity: 0; } }
                            `}</style>               <MarketingProjectRow 
                title="Strategic Design & Visual Identity" 
                description="When existing solutions fall short, I engineer bespoke visual experiences. A curated archive of wireframes, digital assets, and ad campaigns designed to bridge brand identity with functional UX."
                assets={[
                { src: "/Wireframe.png", type: "image" },
                { src: "/WireframeFlowChart.PNG", type: "image" },
                { src: "/FriendshipFavor.png", type: "image" },
                { src: "/PokemonInviteFront.jpg", type: "image" },
                { src: "/PokemonInviteBack.jpg", type: "image" },
                { src: "/PlayCard.png", type: "image" },
                { src: "/ChatAd.mp4", thumbnail: "/ChatAd_thumbnail.jpg", type: "video" },
                { src: "/Collections Ad.mp4", thumbnail: "/Collections Ad_thumbnail.jpg", type: "video" },
                { src: "/Collections 10s.mp4", thumbnail: "/Collections 10s_thumbnail.jpg", type: "video" },
                { src: "/Owl-ternative AD.mp4", thumbnail: "/Owl-ternative AD_thumbnail.jpg", type: "video" },
                { src: "/WarrantAd.mp4", thumbnail: "/WarrantAd_thumbnail.jpg", type: "video" }, // Working!
                { src: "/Constellation Ad.mp4", thumbnail: "/Constellation Ad_thumbnail.jpg", type: "video" }
                ]} 
              />
            </Box>
          </FadeIn>
          
          <Divider borderColor={borderColor} borderBottomWidth="3px" my={3} />

          {/* --- EXPERIENCE --- */}
          <FadeIn>
            <Box as="section">
              <Text fontSize="sm" fontWeight="mono" color={mauveAccent} mt= {5} mb={10} letterSpacing="widest"sx={{"::before": { content: '"root@adriana:~# "' }, "::after": { content: '"_"', animation: "blink 1s infinite" }}}>EXPERIENCE</Text>
                              <style>{`
                              @keyframes blink { 50% { opacity: 0; } }
                            `}</style>              <Box>
                <Flex justify="space-between" align="baseline" mb={1}>
                  <Text fontWeight="bold" fontSize="lg" color={headingColor}>Project Management & Strategic Leadership</Text>
                  <Text fontSize="xs" color="gray.500">2009 — Present</Text>
                </Flex>
                <Text fontSize="sm" color={mauveAccent} fontWeight="bold" mb={2}>U.S. DEPARTMENT OF DEFENSE</Text>
                <Text fontSize="m" mb={5}>I have managed multimillion-dollar asset portfolios and led multidisciplinary teams in high-pressure environments. I focus on resource optimization, process improvement, and cross-functional training to ensure mission success regardless of constraints.</Text>
              </Box>
              <Box>
                <Flex justify="space-between" align="baseline" mb={1}>
                  <Text fontWeight="bold" fontSize="lg" color={headingColor}>Artificial Intelligence Tech</Text>
                  <Text fontSize="xs" color="gray.500">2025 — Present</Text>
                </Flex>
                <Text fontSize="sm" color={mauveAccent} fontWeight="bold" mb={2}>ARTIFICIAL INTELLIGENCE & INTEGRATION CENTER / CARNEGIE MELLON UNIVERSITY</Text>
                <Text fontSize="m" mb={5}>I specialize in building scalable, automated environments that leverage cloud-native technologies to solve complex data problems. My focus is on creating functional solutions that bridge the gap between high-level research and operational utility.</Text>
              </Box>
              <Box>
                <Flex justify="space-between" align="baseline" mb={1}>
                  <Text fontWeight="bold" fontSize="lg" color={headingColor}>Cyber Operations Analyst</Text>
                  <Text fontSize="xs" color="gray.500">2022 — Present</Text>
                </Flex>
                <Text fontSize="sm" color={mauveAccent} fontWeight="bold" mb={2}>U.S. DEPARTMENT OF DEFENSE</Text>
                <Text fontSize="m" mb={5}>In the cyber domain, I functioned as a senior leader for defensive operations, securing one of the world's largest and most targeted enterprise networks. I advised executive-level leadership on global risk posture and orchestrated large-scale mitigation efforts against sophisticated threats.</Text>
              </Box>
              <Box>
                <Flex justify="space-between" align="baseline" mb={1}>
                  <Text fontWeight="bold" fontSize="lg" color={headingColor}>Senior Intelligence Analyst</Text>
                  <Text fontSize="xs" color="gray.500">2009 — 2022</Text>
                </Flex>
                <Text fontSize="sm" color={mauveAccent} fontWeight="bold" mb={2}>U.S. DEPARTMENT OF DEFENSE</Text>
                <Text fontSize="m" mb={5}>I have over a decade of experience leading high-stakes intelligence operations, where I specialized in transforming massive, complex data sets into actionable strategic insights. My work focused on building the technical infrastructure required for global collaboration while maintaining strict adherence to international law and national security policies.</Text>
              </Box>              
            </Box>
          </FadeIn>

          <Divider borderColor={borderColor} borderBottomWidth="3px" my={3} />

          {/* --- FOOTER --- */}
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