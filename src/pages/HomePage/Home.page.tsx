import { InputWithButton } from "@/components/InputWithButton/InputWithButton";
import classes from "./Home.page.module.css"
import lectureItems from "../../database/lecture_items.json"
import { ArticleCardVertical } from "@/components/ArticleCardVertical/ArticleCardVertical";

export function HomePage() {
  return (
    <div className={classes.wrapper}>
      <InputWithButton />
      <div className={classes.container_cards}>
        {lectureItems.map((item) => <ArticleCardVertical name={item.name} />)}
      </div>
    </div>
  );
}
