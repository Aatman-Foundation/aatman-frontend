// src/components/UploadResearchModal.jsx
import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Switch,
  HStack,
  VStack,
  Text,
  useDisclosure,
  useToast,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function UploadResearchModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const onSelectFiles = (list) => {
    if (!list || !list.length) return;
    const arr = Array.from(list);
    // Optional: filter duplicates by name+size
    const existing = new Map(files.map((f) => [`${f.name}-${f.size}`, true]));
    const merged = [
      ...files,
      ...arr.filter((f) => !existing.get(`${f.name}-${f.size}`)),
    ];
    setFiles(merged);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    onSelectFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setCategory("");
    setIsPublic(true);
    setFiles([]);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    if (!title.trim()) {
      toast({ status: "warning", title: "Title is required" });
      return;
    }
    if (files.length === 0) {
      toast({ status: "warning", title: "Please attach at least one file" });
      return;
    }

    // Build FormData for your API
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", desc.trim());
    formData.append("category", category);
    formData.append("isPublic", String(isPublic));
    files.forEach((f) => formData.append("files", f));

    // TODO: call your API here:
    // await fetch("/api/research/upload", { method: "POST", body: formData })

    toast({
      status: "success",
      title: "Upload initiated",
      description: `${files.length} file(s) queued`,
    });

    onClose();
    resetForm();
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={onOpen}
        colorScheme="accent"
        size="lg"
        borderRadius="full"
        boxShadow="brand"
        px={{ base: 2, md: 8 }}
      >
        Upload Research
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          resetForm();
        }}
        size={{ base: "sm", sm: "lg" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Research</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack as="form" spacing={5} align="stretch">
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., A Study on Ayurvedic Herbs in Dermatology"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Brief summary or abstract…"
                  rows={4}
                />
              </FormControl>

              <HStack spacing={4} align="flex-end">
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Select
                    placeholder="Select category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="education">Education</option>
                    <option value="health">Health</option>
                    <option value="ayurveda">Ayurveda</option>
                    <option value="public-policy">Public Policy</option>
                  </Select>
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Public</FormLabel>
                  <Switch
                    isChecked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    colorScheme="accent"
                  />
                </FormControl>
              </HStack>

              {/* Drag-and-drop box */}
              <Box
                border="2px dashed"
                borderColor={isDragging ? "accent.300" : "gray.300"}
                bg={isDragging ? "accent.50" : "gray.50"}
                rounded="md"
                p={6}
                textAlign="center"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                cursor="pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Text fontWeight="semibold" mb={1}>
                  Drag & drop files here
                </Text>
                <Text fontSize="sm" color="gray.600">
                  or click to browse (PDF, DOCX, images…)
                </Text>
                <Input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  display="none"
                  onChange={(e) => onSelectFiles(e.target.files)}
                />
              </Box>

              {/* File list */}
              {files.length > 0 && (
                <VStack align="stretch" spacing={3}>
                  {files.map((f, idx) => (
                    <HStack
                      key={`${f.name}-${f.size}-${idx}`}
                      justify="space-between"
                      bg="gray.50"
                      p={3}
                      rounded="md"
                      border="1px solid"
                      borderColor="gray.200"
                    >
                      <VStack align="flex-start" spacing={0}>
                        <Text fontWeight="medium" noOfLines={1}>
                          {f.name}
                        </Text>
                        <HStack spacing={2}>
                          <Badge colorScheme="brand">
                            {(f.size / 1024).toFixed(1)} KB
                          </Badge>
                          <Badge variant="subtle" colorScheme="accent">
                            {f.type || "unknown"}
                          </Badge>
                        </HStack>
                      </VStack>
                      <IconButton
                        aria-label="Remove file"
                        icon={<DeleteIcon />}
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(idx)}
                      />
                    </HStack>
                  ))}
                </VStack>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack spacing={3}>
              <Button
                variant="ghost"
                onClick={() => {
                  onClose();
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button colorScheme="accent" onClick={handleSubmit}>
                Upload
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
