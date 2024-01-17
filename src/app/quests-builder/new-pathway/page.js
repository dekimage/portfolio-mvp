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
import Circle from "@uiw/react-color-circle";
import { DEFAULT_COLORS } from "../gamify/page";
import { Slider } from "@/components/ui/slider";

const placeholders = {
  checklist: [
    "Brush teeth",
    "Prepare meal",
    "Read a book",
    "Exercise",
    "Drink water",
    "Meditate",
    "Call a friend",
    "Plan the day",
    "Listen to music",
    "Clean up space",
  ],
};

const generatePlaceholder = (type, index) => {
  const placeholder = placeholders[type][index];
  return placeholder || "Add Text...";
};

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
  autoplay: true,
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

const CheckboxOptions = ({ stepIndex, options, setOptions }) => {
  const handleAddOption = () => {
    const newOptions = [...options, ""]; // Add an empty option
    setOptions(stepIndex, newOptions);
  };

  const handleOptionChange = (optionIndex, value) => {
    const newOptions = [...options];
    newOptions[optionIndex] = value;
    setOptions(stepIndex, newOptions);
  };

  const handleDeleteOption = (optionIndex) => {
    const newOptions = options.filter((_, index) => index !== optionIndex);
    setOptions(stepIndex, newOptions);
  };

  return (
    <div className="mt-4">
      {options.map((option, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={option}
            placeholder={generatePlaceholder("checklist", index)}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
          <button onClick={() => handleDeleteOption(index)} className="ml-2">
            <LuTrash />
          </button>
        </div>
      ))}
      <Button variant="outline" onClick={handleAddOption} className="mt-2">
        + Add Option
      </Button>
    </div>
  );
};

const PathwayBuilder = ({ pathwayToEdit = false }) => {
  const router = useRouter();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [openMusic, setOpenMusic] = useState(false);
  const [isGamify, setIsGamify] = useState(false);
  const [musicTrack, setMusicTrack] = useState("");
  const [pathway, setPathway] = useState(pathwayToEdit || DEFAULT_PATHWAY);
  const [hex, setHex] = useState("#F44E3B");
  const { editFromInside, setPathwayPlaying, setIsPathwayEditView } = MobxStore;

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

  // const handleUpdateStepChange = (index, name, value) => {
  //   const newSteps = [...pathway.steps];
  //   newSteps[index][name] = value;
  //   setPathway({ ...pathway, steps: newSteps });
  // };

  const handleUpdateStepChange = (stepIndex, name, value) => {
    const newSteps = [...pathway.steps];
    newSteps[stepIndex] = { ...newSteps[stepIndex], [name]: value };
    setPathway({ ...pathway, steps: newSteps });
  };

  // const handleStepChange = (index, e) => {
  //   const newSteps = [...pathway.steps];
  //   newSteps[index][e.target.name] = e.target.value;
  //   setPathway({ ...pathway, steps: newSteps });
  // };

  const handleStepChange = (stepIndex, e) => {
    const newSteps = [...pathway.steps];
    newSteps[stepIndex] = {
      ...newSteps[stepIndex],
      [e.target.name]: e.target.value,
    };
    setPathway({ ...pathway, steps: newSteps });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pathwayToEdit) {
      // If we Update
      if (pathwayToEdit.isCopy) {
        // Editing user's own pathway copy
        await MobxStore.updateUserPathway(pathwayToEdit.id, pathway);
        setIsPathwayEditView(false);
        return;
      }

      if (
        pathwayToEdit.creatorId === MobxStore.user.uid &&
        !pathwayToEdit.isCopy
      ) {
        // Edit my own template
        await MobxStore.updatePathway(pathwayToEdit.id, pathway);
        setIsPathwayEditView(false);
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

      setIsPathwayEditView(false);
    }

    if (!pathwayToEdit) {
      // Create
      await MobxStore.addUserPathway(pathway);
      setPathway(DEFAULT_PATHWAY);
      router.push("/quests-builder");
    }
  };

  const handleUpdateStepOptions = (stepIndex, newOptions) => {
    const newSteps = [...pathway.steps];
    newSteps[stepIndex].options = newOptions;
    setPathway({ ...pathway, steps: newSteps });
  };

  return (
    <div className="m-4 sm:m-8 flex">
      <div className="flex flex-col bg-white rounded-lg max-w-[480px] w-full">
        <Button
          className="w-fit mb-4"
          variant="outline"
          onClick={() => {
            if (editFromInside) {
              setIsPathwayEditView(false);
            } else {
              setPathwayPlaying(false);
              setIsPathwayEditView(false);
            }
          }}
        >
          <ChevronLeft size={20} />
          Back
        </Button>
        <div className="text-2xl font-bold">
          {pathwayToEdit ? "Edit" : "Create New"} Pathway
        </div>
        <label className="mt-4 text-md font-medium">Icon</label>
        <DialogEmojiPicker
          emoji={pathway.emoji}
          backgroundColor={pathway.backgroundColor}
          handleEmojiChange={(value) => handleInputChange("emoji", value)}
        />

        <label className="mt-4 mb-2 text-md font-medium">Background</label>
        <Circle
          style={{ position: "relative", zIndex: "100 !important" }}
          colors={DEFAULT_COLORS}
          color={hex}
          onChange={(color) => {
            setHex(color.hex);
            handleInputChange("backgroundColor", color.hex);
          }}
        />

        {/* <DialogEmojiPicker
          emoji={pathway.emoji}
          handleEmojiChange={(value) => handleInputChange("emoji", value)}
        /> */}

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
          <div className="flex flex-col pl-4 border-l border-gray-200">
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

        <SwitchWithHelper
          title="Gamify Rewards"
          value={isGamify}
          callback={() => setIsGamify(!isGamify)}
          helperChildren={"Gamify is..."}
        />

        {isGamify && (
          <div className="flex flex-col pl-4 border-l border-gray-200">
            <label className="mt-4 text-md font-medium">
              Reward For Completion
            </label>
            <div>
              <input
                type="number"
                name="reward"
                placeholder="50"
                value={`${pathway.reward}`}
                onChange={(e) => handleInputChange("reward", e.target.value)}
                className="mb-2 p-2 border border-gray-300 rounded w-[70px] mr-2"
              />
              🥮
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
              className="flex flex-col my-4  rounded-lg p-4 border border-gray"
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
                Context (optional?)
              </label>
              <textarea
                type="text"
                name="context"
                placeholder="Add additional context here..."
                multiline
                value={step.context}
                onChange={(e) => handleStepChange(index, e)}
                className="mb-4 p-2 border border-gray-300 rounded h-24"
              />

              {/* <div className="border-t border-gray-200 mt-4"></div> */}

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
                    value: "checklist",
                    label: "Checklist",
                  },
                  {
                    value: "slider",
                    label: "Slider",
                  },
                  {
                    value: "mood",
                    label: "Mood Press",
                  },
                ]}
                helperChildren={"hey"}
              />

              {step.responseType == "text" && (
                <div className="flex flex-col pl-4 border-l border-gray-200">
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
                  {!!step.minText && (
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="number"
                        name="minText"
                        placeholder={`Minimum Text`}
                        value={step.minText}
                        onChange={(e) => handleStepChange(index, e)}
                        className="p-2 border border-gray-300 rounded w-[70px]"
                      />
                      <div>Words</div>
                    </div>
                  )}
                </div>
              )}

              {step.responseType === "checklist" && (
                <div className="flex flex-col pl-4 border-l border-gray-200">
                  <CheckboxOptions
                    stepIndex={index}
                    options={step.options || [""]}
                    setOptions={handleUpdateStepOptions}
                  />
                </div>
              )}

              {step.responseType === "slider" && (
                <div className="flex flex-col pl-4 border-l border-gray-200">
                  <Slider
                    defaultValue={[1]}
                    max={step.sliderMax || 10}
                    step={step.sliderMin || 1}
                    className="mt-4"
                  />
                  <div className="flex justify-between mt-2">
                    <div className="w-[100px]">
                      <label className="mt-4 text-md font-medium">Min</label>
                      <input
                        type="number"
                        name="sliderMin"
                        placeholder="1"
                        value={step.sliderMin}
                        onChange={(e) => handleStepChange(index, e)}
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                      />
                    </div>
                    <div className="w-[100px]">
                      <label className="mt-4 text-md font-medium">Max</label>
                      <input
                        type="number"
                        name="sliderMax"
                        placeholder="10"
                        value={step.sliderMax}
                        onChange={(e) => handleStepChange(index, e)}
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step.responseType === "mood" && <div>Mood Selector</div>}

              {/* <div className="border-t border-gray-200 mt-4"></div> */}

              <label className="mt-4 text-md font-medium">
                Timer (In Seconds)
              </label>
              <input
                type="number"
                name="timer"
                placeholder="30"
                value={step.timer}
                onChange={(e) => handleStepChange(index, e)}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />

              <SwitchWithHelper
                title="Auto-Play Timer"
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
