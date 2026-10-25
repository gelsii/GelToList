import CardListComponent from "@/components/ui/CardListComponent";
import apiServices from "@/services/api.services";
import React from "react";

const lists = [
  {
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.",
  },
  {
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.",
  },
  {
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.",
  },
  {
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.",
  },
  {
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.",
  },
  {
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.",
  },
  {
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.",
  },
  {
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.",
  },
  {
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.",
  },
  {
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae reprehenderit at natus magnam nihil error, recusandae corrupti tempora incidunt animi asperiores explicabo harum obcaecati, ab molestias deserunt quibusdam, id sit.",
  },
];

const Todos = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full place-items-center columns-1 gap-4 sm:columns-2 xl:columns-4">
        {lists.map((item, index) => (
          <CardListComponent content={item.content} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Todos;
