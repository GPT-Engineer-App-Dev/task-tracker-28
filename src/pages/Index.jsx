import { useState } from "react";
import { Box, Input, Button, List, ListItem, ListIcon, Checkbox, Heading, VStack } from "@chakra-ui/react";
import { FaTrash, FaCheckCircle, FaCircle } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <VStack spacing={8} p={5}>
      <Heading mb={6}>Todo List</Heading>
      <Box>
        <Input placeholder="Add a new task" value={inputValue} onChange={handleInputChange} size="lg" mr={2} />
        <Button onClick={handleAddTask} colorScheme="blue" px={8}>
          Add
        </Button>
      </Box>
      <List spacing={3} w="100%">
        {tasks.map((task) => (
          <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
            <Checkbox isChecked={task.isCompleted} onChange={() => toggleTaskCompletion(task.id)}>
              <ListIcon as={task.isCompleted ? FaCheckCircle : FaCircle} color={task.isCompleted ? "green.500" : "gray.500"} />
              {task.text}
            </Checkbox>
            <Button onClick={() => handleDeleteTask(task.id)} size="sm" colorScheme="red">
              <FaTrash />
            </Button>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Index;
