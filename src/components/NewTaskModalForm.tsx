"use client";
import React, { useState } from "react";

const NewTaskModalForm = ({
  onSubmit,
  visible,
  onClose,
  boards,
}: {
  onSubmit: (value: any) => void;
  visible: boolean;
  onClose: () => void;
  boards: any[];
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("low");
  const [thumbnail, setThumbnail] = useState("");

  const [body, setBody] = useState({});
  const [boardId, setBoardId] = useState<string | number>(1);

  const handleChange = (key: string, value: any) => {
    setBody({ ...body, board_id: 1, key: value });
  };

  if (visible) {
    return (
      <div>
        <div
          onClick={onClose}
          className="h-screen w-full bg-black bg-opacity-15 backdrop-blur fixed top-0 left-0 z-[49]"
        />
        <div className="p-4 md:w-1/3 fixed h-screen top-0 right-0 z-50 bg-white">
          <div className="">
            <form
              method="post"
              onSubmit={() => {
                const data = {
                  title,
                  description,
                  thumbnail,
                  level,
                  board_id: boardId,
                };
                onSubmit(data);
              }}
            >
              <div className="mb-6">
                <span className="text-xl">Add task</span>
              </div>
              <div className="grid gap-2 mb-3">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="outline-none border rounded p-2"
                  onChange={(e) => {
                    setTitle(e.target.value);
                    handleChange("title", e.target.value);
                  }}
                />
              </div>
              <div className="grid gap-2 mb-3">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="outline-none border rounded p-2"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    handleChange("description", e.target.value);
                  }}
                />
              </div>
              <div className="grid gap-2 mb-3">
                <label htmlFor="thumbnail">Thumbnail</label>
                <input
                  type="text"
                  name="thumbnail"
                  id="thumbnail"
                  className="outline-none border rounded p-2"
                  value={thumbnail}
                  onChange={(e) => {
                    setThumbnail(e.target.value);
                    handleChange("thumbnail", e.target.value);
                  }}
                />
              </div>
              <div className="grid gap-2 mb-3">
                <label htmlFor="level">Level</label>
                <select
                  className="outline-none border rounded p-2"
                  name="level"
                  id="level"
                  onChange={(e) => {
                    setLevel(e.target.value);
                    handleChange("level", e.target.value);
                  }}
                >
                  <option value="low" selected={level == "low"}>
                    Low
                  </option>
                  <option value="medium" selected={level == "medium"}>
                    Medium
                  </option>
                  <option value="high" selected={level == "high"}>
                    High
                  </option>
                </select>
              </div>
              <div className="grid gap-2 mb-3">
                <label htmlFor="board">Board</label>
                <select
                  className="outline-none border rounded p-2"
                  name="board"
                  id="board"
                  onChange={(e) => {
                    setBoardId(e.target.value);
                    handleChange("level", e.target.value);
                  }}
                >
                  {boards?.map((board) => {
                    return (
                      <option
                        key={board?.id}
                        value={board?.id}
                        selected={boardId == board?.id}
                      >
                        <span className="capitalize">{board?.title}</span>
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="grid gap-2 pt-2">
                <SubmitButton text="Simpan" loading={false} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

const SubmitButton = ({
  loading,
  text,
}: {
  loading: boolean;
  text: string;
}) => {
  return (
    <button
      type="submit"
      className="py-2 border rounded border-black bg-black text-white hover:bg-opacity-80 transition-all ease disabled:bg-opacity-50"
      disabled={loading ? true : false}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default NewTaskModalForm;
