import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spacer,
  Textarea,
  Switch,
} from "@nextui-org/react";
import FormModal from "@/components/FormModal";

// A component to handle the room creation form
const CreateJamRoom = ({ onSubmit }) => {
  const [roomName, setRoomName] = useState("");
  const [maxUsers, setMaxUsers] = useState<number | "">(10); // default max users to 10, or empty if not set
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [lockRoom, setLockRoom] = useState(false); // State to manage password visibility

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call the onSubmit prop with form data
    onSubmit({ roomName, maxUsers, description, password, lockRoom });
    // Reset the form
    setRoomName("");
    setMaxUsers(10);
    setDescription("");
    setPassword("");
    setLockRoom(false);
  };
  return (
    <FormModal title="Create New Room" triggerText="Create Room">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <Input
            required
            clearable
            label="Room Name"
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <Input
            required
            type="number"
            clearable
            label="Maximum Users"
            placeholder="Enter maximum number of users"
            value={maxUsers}
            onChange={(e) => setMaxUsers(Number(e.target.value))}
          />
          {/* <Input
            type="password"
            clearable
            label="Password (optional)"
            placeholder="Enter room password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <Textarea
            clearable
            label="Description"
            placeholder="Enter room description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Switch
              checked={lockRoom}
              onChange={(e) => setLockRoom(e.target.checked)}
            />
            <span>Lock room with password</span>
          </div>
          {lockRoom && (
            <Input
              type="password"
              clearable
              label="Password"
              placeholder="Enter room password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          <Spacer y={2} />
          <ModalFooter>
            <Button type="submit" color="primary">
              Create Room
            </Button>
          </ModalFooter>
        </div>
      </form>
    </FormModal>
  );
};

export default CreateJamRoom;
