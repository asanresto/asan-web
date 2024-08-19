"use client";

import { faker } from "@faker-js/faker";
import { alpha, Box, Button, Stack, TextareaAutosize } from "@mui/material";
import NextImage from "next/image";
import NextLink from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { VList, VListHandle } from "virtua";

import { ArrowCurveBottomLeftIcon, SearchIcon } from "@/assets";
import Header from "@/components/Header";
import { themeColors } from "@/theme";

type Data = {
  id: number;
  value: string;
  me: boolean;
};

const contactData = Array(100)
  .fill(undefined)
  .map((item) => {
    return { name: faker.person.fullName() };
  });

const CustomerSupportPage = ({
  params,
  searchParams,
}: {
  params: Record<string, string>;
  searchParams: { userId: string };
}) => {
  // await getMe();

  return (
    <Box display="flex" height="100vh">
      <Box width="330px" display="flex" flexDirection="column" bgcolor={themeColors.brown[10]}>
        <Stack flex={1} overflow="auto" divider={<Box borderTop={`1px solid ${themeColors.brown[20]}`} />}>
          {contactData.map(({ name }, index) => {
            return (
              <Button
                key={index}
                variant="contained"
                color="brown10"
                sx={{
                  flexShrink: 0,
                  minHeight: 0,
                  p: 2,
                  borderRadius: 0,
                  justifyContent: "flex-start",
                  textAlign: "left",
                }}
              >
                <NextImage
                  width={64}
                  height={64}
                  src="https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg"
                  alt={""}
                  style={{ borderRadius: "50%" }}
                />
                <Stack spacing={1} ml={2}>
                  <Box fontSize="18px" fontWeight={800} lineHeight="initial" letterSpacing="-0.01em">
                    {name}
                  </Box>
                </Stack>
              </Button>
            );
          })}
        </Stack>
        <Button variant="contained" color="green1" sx={{ m: 3 }}>
          Add Contact
        </Button>
      </Box>
      <Box flex={1} display="flex" flexDirection="column">
        <Header
          titleText="Mr. White"
          actions={
            <>
              <Button variant="contained" color="brown10" sx={{ p: 0, minWidth: "64px", minHeight: "64px" }}>
                <SearchIcon width="32px" height="32px" />
              </Button>
            </>
          }
        />
        <Box flex={1}>
          <ChatContainer />
        </Box>
        {/* <Chat /> */}
      </Box>
      {/* <Folders></Folders>
      <Contacts currentUserId={searchParams.userId} />
      <ThreadContainer /> */}
    </Box>
  );
};

const ChatContainer = () => {
  const id = useRef(0);
  const createItem = ({
    value = faker.lorem.paragraphs(1),
    me = false,
  }: {
    value?: string;
    me?: boolean;
  } = {}): Data => ({
    id: id.current++,
    value: value,
    me,
  });
  const [items, setItems] = useState(() =>
    Array.from(
      {
        length: 100,
      },
      () => createItem(),
    ),
  );
  const ref = useRef<VListHandle>(null);
  const isPrepend = useRef(false);
  const shouldStickToBottom = useRef(true);
  const [value, setValue] = useState("Hello world!");

  useLayoutEffect(() => {
    isPrepend.current = false;
  });

  useEffect(() => {
    if (!ref.current) return;
    if (!shouldStickToBottom.current) return;
    ref.current.scrollToIndex(items.length - 1, {
      align: "end",
    });
  }, [items.length]);

  useEffect(() => {
    let canceled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const setTimer = () => {
      timer = setTimeout(() => {
        if (canceled) return;
        setItems((p) => [...p, createItem()]);
        setTimer();
      }, 5000);
    };
    setTimer();
    return () => {
      canceled = true;
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  const disabled = !value.length;
  const submit = () => {
    if (disabled) return;
    shouldStickToBottom.current = true;
    setItems((p) => [
      ...p,
      createItem({
        value,
        me: true,
      }),
    ]);
    setValue("");
  };

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <VList
        ref={ref}
        style={{
          flex: 1,
        }}
        reverse
        shift={isPrepend.current}
        onScroll={(offset) => {
          if (!ref.current) return;
          shouldStickToBottom.current =
            offset - ref.current.scrollSize + ref.current.viewportSize >=
            // FIXME: The sum may not be 0 because of sub-pixel value when browser's window.devicePixelRatio has decimal value
            -1.5;
          if (offset < 100) {
            isPrepend.current = true;
            setItems((p) => [
              ...Array.from(
                {
                  length: 100,
                },
                () => createItem(),
              ),
              ...p,
            ]);
          }
        }}
      >
        {items.map((d) => (
          <Item key={d.id} {...d} />
        ))}
      </VList>
      <Box
        mx={6}
        my={3}
        bgcolor={themeColors.brown[10]}
        pr={3}
        borderRadius={8}
        display="flex"
        alignItems="center"
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          submit();
        }}
      >
        <Box
          component="label"
          display="flex"
          alignItems="center"
          flex={1}
          p={3}
          minHeight="112px"
          sx={{ cursor: "text" }}
        >
          <TextareaAutosize
            style={{
              outline: "none",
              backgroundColor: "transparent",
              border: "none",
              width: "100%",
              fontFamily: "inherit",
              color: alpha(themeColors.brown[100], 0.64),
              fontSize: "18px",
              fontWeight: 700,
              lineHeight: "initial",
              letterSpacing: "-0.01em",
            }}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.code === "Enter" && (e.ctrlKey || e.metaKey)) {
                submit();
                e.preventDefault();
              }
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="green1"
          type="submit"
          disabled={disabled}
          sx={{ p: 0, minWidth: "64px", minHeight: "64px" }}
        >
          <ArrowCurveBottomLeftIcon width="32px" height="32px" />
        </Button>
        {/* <button
          type="button"
          onClick={() => {
            ref.current?.scrollTo(0);
          }}
        >
          jump to top
        </button> */}
      </Box>
    </Box>
  );
};

const Item = ({ value, me }: Data) => {
  const bgcolor = me ? themeColors.brown[80] : themeColors.brown[20];

  return (
    <Box mx={6} mt={1} sx={{ ...(me ? { marginLeft: "64px" } : { marginRight: "64px" }) }}>
      <Stack
        maxWidth="max-content"
        direction={me ? "row-reverse" : "row"}
        spacing="12px"
        borderRadius={me ? "16px 16px 0 16px" : "16px 16px 16px 0"}
        fontSize="18px"
        fontWeight={700}
        lineHeight="initial"
        letterSpacing="-0.01em"
        color={me ? "white" : alpha(themeColors.brown[100], 0.64)}
        p={2}
        bgcolor={bgcolor}
        whiteSpace="pre-wrap"
        sx={{ ...(me ? { marginLeft: "auto" } : { marginRight: "auto" }) }}
      >
        <NextImage
          width={40}
          height={40}
          src="https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg"
          alt={""}
          style={{ display: "block", borderRadius: "50%" }}
        />
        <Box>{value}</Box>
      </Stack>
      <Box
        bgcolor={bgcolor}
        width="16px"
        height="16px"
        borderRadius={me ? "0 0 0 16px" : "0 0 16px 0"}
        sx={{ ...(me ? { marginLeft: "auto" } : { marginRight: "auto" }) }}
      />
    </Box>
  );
};

const Tag = () => {
  return (
    <Box
      bgcolor="#E5EAD7"
      fontSize="12px"
      color={themeColors.green[50]}
      fontWeight={800}
      lineHeight="34px"
      px="10px"
      letterSpacing="0.1em"
      borderRadius="17px"
    >
      CHEMIST
    </Box>
  );
};

export default CustomerSupportPage;
