"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TitleDescription } from "../page";
import { DialogEmojiPicker } from "../new-pathway/page";
import { useEffect, useState } from "react";
import { Combobox } from "../components/ComboBox";
import Circle from "@uiw/react-color-circle";
import MobxStore from "../mobx";
import { observer } from "mobx-react";

export const DEFAULT_COLORS = [
  "#F44E3B",
  "#FE9200",
  "#FCDC00",
  "#edff86",
  "#D6CE93",
  "#EFEBCE",
  "#D1F5BE",
  "#9CDE9F",
  "#B8F3FF",
  "#907AD6",
  "#DABFFF",
  "#0E6BA8",
  "#3160ED",
  "#2a9d8f",
  "#b5838d",
  "#6d6875",
  "#e5989b",
  "#edf6f9",
  "#f5ebe0",
  "#ffb5a7",
  "#adc178",
  "#ca6702",
  "#f5cac3",
  "#e6ccb2",
];

const STATIC_MAX_PURCHASE_LIMITS = [
  { value: "unlimited", label: "Unlimited" },
  { value: "single", label: "Single" },
  { value: "every day", label: "Every day" },
  { value: "every week", label: "Every week" },
  { value: "every month", label: "Every month" },
  { value: "every year", label: "Every year" },
  { value: "custom", label: "Custom" },
];

const STATIC_REWARDS = [
  {
    cost: 50,
    name: "Watch 1 episode of anime",
    emoji: "📺",
    timesPurchased: 0,
    backgroundColor: "#F44E3B",
    maxPurchaseLimit: "unlimited", //single/every day/every week/ every month/ every year/ custom
  },
  {
    cost: 100,
    name: "Watch 1 movie",
    emoji: "🎥",
    timesPurchased: 0,
    backgroundColor: "#FE9200",
    maxPurchaseLimit: "single",
  },
  {
    cost: 200,
    name: "Eat 1 dessert",
    emoji: "🍰",
    timesPurchased: 0,
    backgroundColor: "#FCDC00",
    maxPurchaseLimit: "every day",
  },
];

const defaultReward = {
  cost: null,
  name: "",
  emoji: "🎁",
  timesPurchased: 0,
  maxPurchaseLimit: "unlimited",
  backgroundColor: "transparent",
};

const RewardBuilder = ({ setIsCreate, rewardState, setRewardState }) => {
  const [hex, setHex] = useState("#F44E3B");
  const [reward, setReward] = useState(
    rewardState ? rewardState : defaultReward
  );

  useEffect(() => {
    if (!rewardState) return;

    setReward(rewardState);
  }, [rewardState]);

  const saveReward = (reward) => {
    if (rewardState) {
      MobxStore.updateReward(reward);
    } else {
      MobxStore.addReward(reward);
    }
    setIsCreate(false);
    setRewardState(null);
  };

  const handleInputChange = (name, value) => {
    setReward({ ...reward, [name]: value });
  };

  return (
    <div>
      <TitleDescription
        title="Create New Reward"
        description="Buy rewards using coins you earn by completing pathways"
      />
      <div className="flex flex-col">
        <label className="mt-4 text-md font-medium">Icon</label>
        <DialogEmojiPicker
          emoji={reward.emoji}
          backgroundColor={reward.backgroundColor}
          handleEmojiChange={(value) => handleInputChange("emoji", value)}
        />

        <label className="mt-4 mb-2 text-md font-medium">Background</label>
        <Circle
          colors={DEFAULT_COLORS}
          color={hex}
          onChange={(color) => {
            setHex(color.hex);
            handleInputChange("backgroundColor", color.hex);
          }}
        />
        <label className="mt-4 text-md font-medium">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Watch 20 minutes of Netflix"
          value={reward.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <label className="mt-4 text-md font-medium">Cost</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            name="cost"
            placeholder={100}
            value={reward.cost}
            onChange={(e) => handleInputChange("cost", e.target.value)}
            className="p-2 border border-gray-300 rounded max-w-[80px]"
          />
          <div className="text-2xl">🥮</div>
        </div>
        <label className="mt-4 text-md font-medium">Max Purchase Limit</label>
        <Combobox
          value={reward.maxPurchaseLimit}
          setValue={(value) => handleInputChange("maxPurchaseLimit", value)}
          options={STATIC_MAX_PURCHASE_LIMITS}
          select
        />
        {reward.maxPurchaseLimit === "custom" && (
          <div className="flex items-center gap-2 mt-4 ml-4">
            <input
              type="number"
              name="cost"
              placeholder={3}
              value={reward.customTimes}
              onChange={(e) => handleInputChange("customTimes", e.target.value)}
              className="p-2 border border-gray-300 rounded max-w-[80px]"
            />
            <div>times in</div>
            <input
              type="number"
              name="cost"
              placeholder={1}
              value={reward.customDays}
              onChange={(e) => handleInputChange("customDays", e.target.value)}
              className="p-2 border border-gray-300 rounded max-w-[80px]"
            />
            <div>{reward.customDays > 1 ? "days" : "day"}</div>
          </div>
        )}
        <Button className="mt-4" onClick={() => saveReward(reward)}>
          Save
        </Button>
        <Button
          variant="destructive"
          className="mt-4"
          onClick={() => {
            MobxStore.deleteReward(reward);
            setIsCreate(false);
            setRewardState(null);
          }}
        >
          Delete
        </Button>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => {
            setIsCreate(false);
            setRewardState(null);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

const Reward = ({
  reward,
  setIsCreate,
  isCreate,
  rewardState,
  setRewardState,
}) => {
  const {
    cost,
    name,
    emoji,
    timesPurchased,
    maxPurchaseLimit,
    isPathway, // if its pathway - play pathway, disable only after completed!
  } = reward;
  return (
    <div className="flex items-center justify-between  p-2 border border-gray-200 rounded-md">
      <div className="flex items-center">
        <div
          className="text-2xl mr-2 border-gray border p-4 rounded"
          style={{ backgroundColor: reward.backgroundColor }}
        >
          {emoji}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-md">{name}</div>
        <div className="flex gap-2">
          <div className="">{cost} 🥮</div>
          <Badge className="">{maxPurchaseLimit}</Badge>
        </div>
      </div>
      <div className="flex items-center flex-grow justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setRewardState(reward);
            setIsCreate(true);
          }}
        >
          Edit
        </Button>
        <Button onClick={() => MobxStore.buyReward(reward)}>Buy</Button>

        {/* <div className="text-lg ml-2">{timesPurchased}</div> */}
      </div>
    </div>
  );
};

const GamifyPage = observer(() => {
  const [isCreate, setIsCreate] = useState(false);
  const [rewardState, setRewardState] = useState(null);
  return (
    <div className="h-[90vh]  max-w-[600px] m-4 sm:mx-8">
      {isCreate ? (
        <RewardBuilder
          setIsCreate={setIsCreate}
          rewardState={rewardState}
          setRewardState={setRewardState}
        />
      ) : (
        <>
          <TitleDescription
            title="Rewards"
            description="Spend coins you earn by completing pathways to buy custom rewards."
            button={
              <Button onClick={() => setIsCreate(true)}>+ Create Reward</Button>
            }
          />
          <div className="flex flex-col gap-4 mb-4">
            {STATIC_REWARDS.map((reward, index) => (
              <Reward
                key={index}
                reward={reward}
                setIsCreate={setIsCreate}
                isCreate={isCreate}
                rewardState={rewardState}
                setRewardState={setRewardState}
              />
            ))}
          </div>

          {MobxStore.rewards.map((reward, index) => (
            <Reward
              key={index}
              reward={reward}
              setIsCreate={setIsCreate}
              isCreate={isCreate}
              rewardState={rewardState}
              setRewardState={setRewardState}
            />
          ))}
        </>
      )}
    </div>
  );
});

export default GamifyPage;
