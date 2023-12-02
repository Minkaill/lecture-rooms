import { InputWithButton } from "@/components/InputWithButton/InputWithButton";
import classes from "./Home.page.module.css"
import { ArticleCardVertical } from "@/components/ArticleCardVertical/ArticleCardVertical";
import { useEffect } from "react";
import { useMantineColorScheme } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getCategories } from "@/store/features/categories";
import { selectCategories } from "@/store/slices/categories";
import Loader from 'react-loaders'
import { HeroContentLeft } from "@/components/NavBar/HeroContentLeft";

export function HomePage() {
  const { setColorScheme } = useMantineColorScheme()

  const { categories, isLoading } = useAppSelector(selectCategories)

  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    setColorScheme("dark")
  }, [setColorScheme])

  if (isLoading) return <div className={classes.wrapper}>
    <div className={classes.loader}>
      <Loader type="ball-scale-multiple" active />
    </div>
  </div>

  return (
    <>
      <HeroContentLeft />
      <div className={classes.wrapper}>
        <InputWithButton />
        <div className={classes.container_cards}>
          {categories?.map((item) => <ArticleCardVertical key={item.id} id={item.id} name={item.name} />)}
        </div>
      </div>
    </>
  );
}
