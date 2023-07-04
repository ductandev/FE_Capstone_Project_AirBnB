import React from "react";
import styles from './categories.module.css'

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { IoDiamond } from "react-icons/io5";
import {
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiIsland,
  GiWindmill,
  GiCactus,
  GiCaveEntrance,
  GiBarn,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";

import CategoryBox from "./CategoryBox/CategoryBox";
import { BsSnow } from "react-icons/bs";

type Props = {};

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This proerty is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This proerty has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This proerty is morden!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This proerty is in the countyside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This proerty has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This proerty is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This proerty is morden!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This proerty has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This proerty is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This proerty has camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This proerty has snow!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This proerty is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This proerty is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This proerty is in the barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This proerty is luxurious!",
  },
];

export default function Categories({}: Props) {
  return (
      <div
        className={`
        pt-4 
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto
        ${styles.overflow}
    `}>
        {categories.map((item) => (
          <CategoryBox key={item.label} label={item.label} icon={item.icon} />
        ))}
      </div>
  );
}
