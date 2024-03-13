import { getMe } from "@/actions/user";
import LoggedInUser from "@/components/LoggedInUser";
import { Button, Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import NextLink from "next/link";
import { ReactNode } from "react";

const dashboarItems = [{ href: "/", label: "Sales" }];

const outletItems = [{ href: "/outlets", label: "Outlets" }];

const productNavigationItems = [{ href: "/products", label: "Products" }];

const orderNavigationItems = [
  { href: "/orders", label: "Orders" },
  { href: "/orders", label: "Cancel Requests" },
];

const jobPostingItems = [{ href: "/orders", label: "Job Postings" }];

const employeeItems = [{ href: "/employees", label: "Employees" }];

const customerItems: { href: string; label: ReactNode }[] = [
  { href: "/customers", label: "Customers" },
  { href: "/customer-support", label: "Support" },
];

const MainLayout = async ({ children }: { children: ReactNode }) => {
  // const result = await getServerSideUrql().query<MeQuery, MeQueryVariables>(
  //   getMeDoc,
  //   {},
  //   {
  //     fetchOptions: {
  //       headers: {
  //         Authorization: `Bearer ${cookies().get(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY)?.value}`,
  //       },
  //     },
  //   },
  // );
  const data = await getMe();

  return (
    <Box minHeight="900px" height="100vh" display="flex" flexDirection="column">
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button> */}
          <Stack width="100%" direction="row" spacing={1}>
            <Button LinkComponent={NextLink} href="/" sx={{ color: "white" }}>
              HOME
            </Button>
            <Box flex={1} />
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <Box width={24} height={24} />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="error">
                <Box width={24} height={24} />
              </Badge>
            </IconButton>
            {data.data?.me && (
              <Tooltip title="Open settings">
                <LoggedInUser>
                  <Avatar alt={data.data.me.name ?? ""} src={data.data?.me?.avatar} />
                </LoggedInUser>
              </Tooltip>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box display="flex" alignItems="stretch" flex={1}>
        <Box component="aside" minWidth="300px" display={{ xs: "none", lg: "block" }}>
          <List
            // sx={{ width: "100%" }}
            component="nav"
            // subheader={
            //   <ListSubheader component="div" id="nested-list-subheader">
            //     Products
            //   </ListSubheader>
            // }
          >
            <ListSubheader component="div" id="nested-list-subheader">
              Dashboards
            </ListSubheader>
            {dashboarItems.map((item, index) => {
              return (
                <ListItemButton key={index} LinkComponent={NextLink} href={item.href}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            })}
            <ListSubheader component="div" id="nested-list-subheader">
              Outlets
            </ListSubheader>
            {outletItems.map((item, index) => {
              return (
                <ListItemButton key={index} LinkComponent={NextLink} href={item.href}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            })}
            <ListSubheader component="div" id="nested-list-subheader">
              Products
            </ListSubheader>
            {productNavigationItems.map((item, index) => {
              return (
                <ListItemButton key={index} LinkComponent={NextLink} href={item.href}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            })}
            <ListSubheader component="div" id="nested-list-subheader">
              HRM
            </ListSubheader>
            {employeeItems.map((item, index) => {
              return (
                <ListItemButton key={index} LinkComponent={NextLink} href={item.href}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            })}
            <ListSubheader component="div">Orders</ListSubheader>
            {orderNavigationItems.map((item, index) => {
              return (
                <ListItemButton key={index} LinkComponent={NextLink} href={item.href}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            })}
            <ListSubheader component="div">Customers</ListSubheader>
            {customerItems.map((item, index) => {
              return (
                <ListItemButton key={index} LinkComponent={NextLink} href={item.href}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            })}
            <ListSubheader component="div">Job Postings</ListSubheader>
            {jobPostingItems.map((item, index) => {
              return (
                <ListItemButton key={index} LinkComponent={NextLink} href={item.href}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            })}
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Inbox" />
              {/* {open ? <ExpandLess /> : <ExpandMore />} */}
            </ListItemButton>
            <Collapse
              // in={open}
              in
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
        <Container component="main" sx={{ flex: 1 }} maxWidth="xl">
          {/* <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              MUI
            </Link>
            <Link underline="hover" color="inherit" href="/material-ui/getting-started/installation/">
              Core
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
          </Breadcrumbs> */}
          <Box mt={3} />
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
