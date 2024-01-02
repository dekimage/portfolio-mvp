"use client";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { Combobox } from "../components/ComboBox";
import { Button } from "@/components/ui/button";
import { LuTrash } from "react-icons/lu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  dialogClose,
} from "@/components/ui/dialog";
import MobxStore from "../mobx";
import { useRouter } from "next/navigation";
import EmojiPicker from "emoji-picker-react";
import { ChevronLeft } from "lucide-react";

const STATIC_MUSIC_TRACKS = [
  {
    value: "1",
    label: "RPG Town Mp3",
  },
  {
    value: "2",
    label: "Relaxing Moon Mp3",
  },
];

const STATIC_IMAGES = [
  "https://cdn.midjourney.com/e9023bf4-7612-40dc-b88f-2e86b490ea66/0_0.png",
  "https://cdn.midjourney.com/e9023bf4-7612-40dc-b88f-2e86b490ea66/0_1.png",
  "https://cdn.midjourney.com/e9023bf4-7612-40dc-b88f-2e86b490ea66/0_2.png",
  "https://cdn.midjourney.com/e9023bf4-7612-40dc-b88f-2e86b490ea66/0_3.png",
];

const DEFAULT_PATHWAY = {
  name: "",
  description: "",
  duration: "",
  time: "",
  emoji: "",
  autoPlayMusic: false,
  background: "",
  steps: [],
};

const DEFAULT_STEP = {
  question: "",
  timer: 0,
  responseType: "text",
  minText: 0,
  allowSkip: false,
  autoplay: false,
};

const ImageSelection = ({ selectedImage, setSelectedImage }) => {
  return (
    <div className="max-h-[300px] overflow-y-auto mt-4">
      {STATIC_IMAGES.map((image, index) => (
        <div
          key={index}
          className={`p-1 my-2 cursor-pointer h-24 bg-cover  bg-no-repeat bg-center w-full border-4  ${
            selectedImage === index ? "border-black" : "border-slate-200"
          }`}
          onClick={() => setSelectedImage(index)}
        >
          <div
            className="h-20 bg-cover  bg-no-repeat bg-center w-full"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export const DialogEmojiPicker = ({
  emoji,
  backgroundColor = "transparent",
  handleEmojiChange,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="flex justify-center items-center border border-slate w-fit p-4 text-4xl cursor-pointer rounded"
          style={{
            backgroundColor,
          }}
        >
          {emoji || "🎲"}
        </div>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <EmojiPicker
          skinTonesDisabled
          suggestedEmojisMode="recent"
          emojiStyle="native"
          lazyLoadEmojis={true}
          onEmojiClick={(emojiResponse) => {
            handleEmojiChange(emojiResponse.emoji);
            dialogClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

const DialogSelectBackground = ({ handleSelectImage, background }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="h-24 bg-cover  bg-no-repeat bg-center w-full flex justify-center items-center  cursor-pointer border border-gray border-dashed mt-4"
          style={{ backgroundImage: `url(${background})` }}
        >
          {!background && (
            <div>
              <span className="text-2xl mr-1">+</span> Add Image Background
            </div>
          )}
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Select Background</DialogTitle>
        <ImageSelection
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <DialogClose asChild>
          <Button
            onClick={() => handleSelectImage(STATIC_IMAGES[selectedImage])}
          >
            Apply
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

const QuestionHelpBox = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-2 h-6 ml-1">
        <Button variant="outline">?</Button>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

const ComboBoxWithHelper = ({
  helperChildren,
  title,
  value,
  setValue,
  searchLabel,
  options,
}) => {
  return (
    <div className="flex items-center justify-between border-gray-300  rounded mt-6">
      <div>
        <label className="mt-4 text-md font-medium">{title}</label>
        <QuestionHelpBox>{helperChildren}</QuestionHelpBox>
      </div>
      <Combobox
        value={value}
        setValue={setValue}
        searchLabel={searchLabel}
        options={options}
        select
      />
    </div>
  );
};

const SwitchWithHelper = ({ helperChildren, title, value, callback }) => {
  return (
    <div className="flex items-center justify-between border-gray-300  rounded mt-6">
      <div>
        <label className="mt-4 text-md font-medium">{title}</label>
        <QuestionHelpBox>{helperChildren}</QuestionHelpBox>
      </div>
      <Switch checked={value} onCheckedChange={() => callback()} />
    </div>
  );
};

// export const EmojiBox = ({ emoji, setEmojiPickerOpen = false }) => {
//   return (
//     <div
//       className={`flex justify-center items-center border border-slate w-fit p-4 text-4xl ${
//         setEmojiPickerOpen && "cursor-pointer"
//       }`}
//       onClick={() => {
//         setEmojiPickerOpen && setEmojiPickerOpen(true);
//       }}
//     >
//       {emoji}
//     </div>
//   );
// };

const PathwayBuilder = ({ pathwayToEdit = false, setIsEditView }) => {
  const router = useRouter();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [openMusic, setOpenMusic] = useState(false);
  const [musicTrack, setMusicTrack] = useState("");
  const [pathway, setPathway] = useState(pathwayToEdit || DEFAULT_PATHWAY);

  useEffect(() => {
    if (pathwayToEdit) {
      setPathway(pathwayToEdit);
    }
  }, [pathwayToEdit]);

  const handleInputChange = (name, value) => {
    setPathway({ ...pathway, [name]: value });
  };

  const deleteStep = (index) => {
    const newSteps = [...pathway.steps];
    newSteps.splice(index, 1);
    setPathway({ ...pathway, steps: newSteps });
  };

  const addStep = () => {
    setPathway({
      ...pathway,
      steps: [...pathway.steps, DEFAULT_STEP],
    });
  };

  const handleUpdateStepChange = (index, name, value) => {
    const newSteps = [...pathway.steps];
    newSteps[index][name] = value;
    setPathway({ ...pathway, steps: newSteps });
  };

  const handleStepChange = (index, e) => {
    const newSteps = [...pathway.steps];
    newSteps[index][e.target.name] = e.target.value;
    setPathway({ ...pathway, steps: newSteps });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pathwayToEdit) {
      // If we Update
      if (pathwayToEdit.isCopy) {
        // Editing user's own pathway copy
        await MobxStore.updateUserPathway(pathwayToEdit.id, pathway);
        setIsEditView(false);
        return;
      }

      if (
        pathwayToEdit.creatorId === MobxStore.user.uid &&
        !pathwayToEdit.isCopy
      ) {
        // Edit my own template
        await MobxStore.updatePathway(pathwayToEdit.id, pathway);
        setIsEditView(false);
        return;
      }
      // Make a copy from someone else's template

      // AKO MI TREBA SAMO CREATE - VAKA, ALI AKO TREBA I DA PROVERAM DALI VEKJE GO IMA ONDAK SO GETOR CREATE,
      // MOZAM SO UI DA SREDAM OVOJ CASE ZA NA SETTINGS KOPCETO DA TE PRASA DALI SAKAS DA IDES NA TVOJOT EXISTING COPY ILI NOV SAKAS OD TOJ TEMPLATE
      // const copyId = await MobxStore.getOrCreateUserPathwayCopy(
      //   pathwayToEdit.id
      // );

      const copyId = await MobxStore.createPathwayCopy(pathwayToEdit.id);

      // update the fresh copy just made
      if (copyId) {
        const pathwayWithoutId = { ...pathway };
        delete pathwayWithoutId.id;
        await MobxStore.updateUserPathway(copyId, pathwayWithoutId);
      }

      setIsEditView(false);
    }

    if (!pathwayToEdit) {
      // Create
      await MobxStore.addUserPathway(pathway);
      setPathway(DEFAULT_PATHWAY);
      router.push("/quests-builder");
    }
  };

  return (
    <div className="mt-4 flex ml-8">
      <div className="flex flex-col bg-white rounded-lg max-w-[480px] w-full">
        <Button
          className="w-fit mb-4"
          variant="outline"
          onClick={() => {
            setIsEditView
              ? setIsEditView(false)
              : router.push("/quests-builder");
          }}
        >
          <ChevronLeft size={20} />
          Back
        </Button>
        <DialogEmojiPicker
          emoji={pathway.emoji}
          handleEmojiChange={(value) => handleInputChange("emoji", value)}
        />

        <DialogSelectBackground
          background={pathway.background}
          handleSelectImage={(value) => handleInputChange("background", value)}
        />
        <label className="mt-4 text-md font-medium">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={pathway.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />

        <label className="mt-4 text-md font-medium">
          Description (Optional)
        </label>
        <textarea
          type="text"
          name="description"
          placeholder="Description"
          value={pathway.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded h-24"
        />

        <SwitchWithHelper
          title="Background Music"
          value={openMusic}
          callback={() => setOpenMusic(!openMusic)}
          helperChildren={"Auto play is..."}
        />

        {openMusic && (
          <div className="">
            <SwitchWithHelper
              title="Auto Play Music"
              value={pathway.autoPlayMusic}
              callback={() =>
                handleInputChange("autoPlayMusic", !pathway.autoPlayMusic)
              }
              helperChildren={"Auto play is..."}
            />

            <div className="flex justify-between mt-4">
              <Combobox
                value={musicTrack}
                setValue={setMusicTrack}
                searchLabel={"Music Track"}
                options={STATIC_MUSIC_TRACKS}
                select
              />

              <Button>Try it</Button>
            </div>
          </div>
        )}

        <div className="text-2xl mt-8 flex justify-center">
          Steps ({pathway.steps?.length})
        </div>

        {pathway.steps?.map((step, index) => {
          return (
            <div
              key={index}
              className="my-4  rounded-lg p-4 border border-gray"
            >
              <div className="flex justify-between mb-4">
                <div className="text-lg">Step {index + 1}</div>
                <div onClick={() => deleteStep(index)}>
                  <LuTrash />
                </div>
              </div>

              <label className="mt-4 text-md font-medium">Question</label>
              <input
                type="text"
                name="question"
                placeholder={`Step ${index + 1} Question`}
                value={step.question}
                onChange={(e) => handleStepChange(index, e)}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />

              <label className="mt-4 text-md font-medium">
                Timer (In Seconds)
              </label>
              <input
                type="text"
                name="timer"
                placeholder="30"
                value={step.timer}
                onChange={(e) => handleStepChange(index, e)}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />

              <ComboBoxWithHelper
                title="Response Type"
                value={step.responseType}
                setValue={(value) => {
                  handleUpdateStepChange(index, "responseType", value);
                }}
                searchLabel={"Response Type"}
                options={[
                  {
                    value: "text",
                    label: "Text Input",
                  },
                  {
                    value: "mood",
                    label: "Mood Press",
                  },
                  {
                    value: "slider",
                    label: "Slider",
                  },
                ]}
                helperChildren={"hey"}
              />

              {step.responseType == "text" && (
                <SwitchWithHelper
                  title="Set Minimum Text"
                  value={step.minText}
                  callback={() =>
                    handleUpdateStepChange(
                      index,
                      "minText",
                      step.minText ? 0 : 30
                    )
                  }
                  helperChildren={"hey"}
                />
              )}

              {!!step.minText && (
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    name="minText"
                    placeholder={`Minimum Text`}
                    value={step.minText}
                    onChange={(e) => handleStepChange(index, e)}
                    className="p-2 border border-gray-300 rounded max-w-[100px]"
                  />
                  <div>Words</div>
                </div>
              )}

              <SwitchWithHelper
                title="Auto-Play Next Step"
                value={step.autoplay}
                callback={() =>
                  handleUpdateStepChange(index, "autoplay", !step.autoplay)
                }
                helperChildren={"hey"}
              />

              <SwitchWithHelper
                title="Allow Skip Step"
                value={step.allowSkip}
                callback={() =>
                  handleUpdateStepChange(index, "allowSkip", !step.allowSkip)
                }
                helperChildren={"hey"}
              />
            </div>
          );
        })}

        <Button
          variant="outline"
          className="mt-4 border-dashed"
          onClick={addStep}
        >
          + Add Step
        </Button>
        <Button
          type="submit"
          className="mt-4"
          // disabled={pathway.steps?.length < 1}
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default PathwayBuilder;
