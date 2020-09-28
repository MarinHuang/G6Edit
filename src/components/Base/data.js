/**
 * Created by marinh on 2019/12/19.
 */
var node1 = {
  id: "node3",
  color: "#13C2C2",
  iconType: "1",
  iconUrl: "el-icon-video-play",
  image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTc2NjU2MDE4MjEzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIzNjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDk4OS44NjY2NjdDMjQ4LjA4MTA2NyA5ODkuODY2NjY3IDM0LjEzMzMzMyA3NzUuOTE4OTMzIDM0LjEzMzMzMyA1MTJTMjQ4LjA4MTA2NyAzNC4xMzMzMzMgNTEyIDM0LjEzMzMzM3M0NzcuODY2NjY3IDIxMy45NDc3MzMgNDc3Ljg2NjY2NyA0NzcuODY2NjY3LTIxMy45NDc3MzMgNDc3Ljg2NjY2Ny00NzcuODY2NjY3IDQ3Ny44NjY2Njd6IG0wLTY4LjI2NjY2N2MyMjYuMjAxNiAwIDQwOS42LTE4My4zOTg0IDQwOS42LTQwOS42UzczOC4yMDE2IDEwMi40IDUxMiAxMDIuNCAxMDIuNCAyODUuNzk4NCAxMDIuNCA1MTJzMTgzLjM5ODQgNDA5LjYgNDA5LjYgNDA5LjZ6IG0tNjEuMjM1Mi0xMzcuMzUyNTMzQTMzLjc5MiAzMy43OTIgMCAwIDEgNDA5LjYgNzUxLjMwODhWMjcyLjcyNTMzM2EzMy42NTU0NjcgMzMuNjU1NDY3IDAgMCAxIDQ5LjI1NDQtMzAuMDAzMiAzMy40MTY1MzMgMzMuNDE2NTMzIDAgMCAxIDkuNTIzMiA2LjY5MDEzNGwyMzguNTkyIDIzOC44MzA5MzNhMzQuMDY1MDY3IDM0LjA2NTA2NyAwIDAgMSAwIDQ3LjkyMzJsLTIzOC41OTIgMjM4Ljg2NTA2N2EzMy40ODQ4IDMzLjQ4NDggMCAwIDEtMTcuNjEyOCA5LjI1MDEzM3ogbTI2LjM1MDkzMy00MzAuNTIzNzM0djMxNi44OTM4NjdsMTU4LjI3NjI2Ny0xNTguNDQ2OTMzLTE1OC4yNzYyNjctMTU4LjQ0NjkzNHoiIGZpbGw9IiMxM0MyQzIiIHAtaWQ9IjIzNjUiPjwvcGF0aD48L3N2Zz4=",
  inPoints: [[0, 0.5]],
  label: "触发节点...",
  name: "触发节点11111111111",
  nodeType: "start",
  offsetX: 17,
  offsetY: 23,
  outPoints: [[1, 0.5]],
  shape: "customNode",
  size: [140, 38],
  type: "node",
  x: 545,
  y: 187.5999984741211,
  labelOffsetX: 5,            // 文本标签 x 坐标偏移
  labelOffsetY: 10            // 文本标签 y 坐标偏移
}
var node2 = {
  color: "#FAAD15",
  iconType: "1",
  iconUrl: "el-icon-question",
  id: "node13",
  image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTc2NjU2MDYyMTY2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMxMTgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDExMy40MDdjLTIxOS43OSAwLTM5OC42MDEgMTc4LjgxNi0zOTguNjAxIDM5OC42MTIgMCAyMTkuNzc0IDE3OC44MTIgMzk4LjU3NCAzOTguNjAxIDM5OC41NzRzMzk4LjYwMS0xNzguOCAzOTguNjAxLTM5OC41NzRjMC0yMTkuNzk1LTE3OC44MTItMzk4LjYxMi0zOTguNjAxLTM5OC42MTJ6IG00MC4yMTggNjg5LjY4OGgtODAuMDQ2di04MC4wNDdoODAuMDQ2djgwLjA0N3pNNjc5LjEyIDQ0Ni4yMDZjLTExLjcxNCAyMS4wODYtMzQuNjI0IDQ2LjcyOC02OC43MjMgNzYuOTIzLTIyLjkwOSAyMC4zMDQtMzcuODc0IDM1LjI3Ni00NC45MDQgNDQuOTA0LTcuMDI4IDkuNjMzLTEyLjIzOCAyMC42OTQtMTUuNjE4IDMzLjE5LTMuMzg3IDEyLjQ5NC01LjM0IDMyLjc5OS01Ljg1OCA2MC45MTNoLTY3LjU1Yy0wLjI2My05LjM3Mi0wLjM5LTE2LjQtMC4zOS0yMS4wODYgMC0yNy41ODkgMy45MDQtNTEuNDA3IDExLjcxMy03MS40NTYgNS43MjMtMTUuMDk0IDE0Ljk2NS0zMC4zMjIgMjcuNzIyLTQ1LjY4NCA5LjM3Mi0xMS4xOSAyNi4yMjMtMjcuNTMgNTAuNTY2LTQ5LjAwMyAyNC4zMzgtMjEuNDc3IDQwLjE1Mi0zOC41OSA0Ny40NDItNTEuMzQ4IDcuMjg1LTEyLjc1IDEwLjkzNC0yNi42OCAxMC45MzQtNDEuNzggMC0yNy4zMzMtMTAuNjc4LTUxLjM0OC0zMi4wMTktNzIuMDQzLTIxLjM0OC0yMC42OTUtNDcuNTEtMzEuMDQxLTc4LjQ4NS0zMS4wNDEtMjkuOTM4IDAtNTQuOTI5IDkuMzctNzQuOTcgMjguMTE0LTIwLjA0OCAxOC43NDItMzMuMTkgNDguMDI2LTM5LjQzOCA4Ny44NTVsLTcyLjIzNy04LjU5YzYuNTA1LTUzLjM2IDI1LjgzMy05NC4yMyA1Ny45ODUtMTIyLjYwNyAzMi4xNDctMjguMzcgNzQuNjQyLTQyLjU2IDEyNy40ODgtNDIuNTYgNTUuOTY1IDAgMTAwLjYwNyAxNS4yMjcgMTMzLjkzMSA0NS42ODMgMzMuMzE4IDMwLjQ1NyA0OS45OCA2Ny4yOTUgNDkuOTggMTEwLjUwMyAwLjAwMiAyNC45OS01Ljg1NSA0OC4wMjgtMTcuNTcgNjkuMTEzeiIgZmlsbD0iI0ZBQUQxNSIgcC1pZD0iMzExOSI+PC9wYXRoPjwvc3ZnPg==",
  inPoints: [[0, 0.5]],
  label: "填槽节点",
  name: "填槽节点",
  nodeType: "slot",
  noteType: undefined,
  offsetX: 13,
  offsetY: 22,
  outPoints: [[1, 0.5]],
  shape: "customNode",
  size: [140, 38],
  type: "node",
  x: 507,
  y: 272.5999984741211,
}
var node3 = {
  color: "#28A0FF",
  iconType: "1",
  iconUrl: "el-icon-share",
  id: "node27",
  image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTc2NjU2MTE3NTA1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ0OTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODE5LjIyNjk3NyA2NTkuNDMzMDRDNzU3LjMzMzAyIDY1OS40MzMwNCA3MDQuMTY0NjgyIDY5NC40MDkxNTkgNjc2LjY4MTA1NyA3NDUuMjk2NDk4TDMxNS45NzU3NTkgNTYyLjQyMjM1OUMzMjQuOTgxNDc4IDU0Mi4yMTQ3MjkgMzMwLjIxOTc0OSA1MTkuOTcxNjA2IDMzMC4yMTk3NDkgNDk2LjQyMTcwNiAzMzAuMjE5NzQ5IDQ3MS4zOTc2MzQgMzI0LjEwNTQ1NyA0NDcuOTczODM2IDMxNC4wMDcyMjMgNDI2Ljc5NTMyOUw2OTAuNjUyNzUyIDI3MS41NzU1NThDNzIwLjQwOTU3MiAzMDkuODM5MjY1IDc2Ni4zNjY2NCAzMzQuODkxMjM1IDgxOC41OTIgMzM0Ljg5MTIzNSA5MDguNDExNSAzMzQuODkxMjM1IDk4MS4yMjYxNDkgMjYyLjA3ODgyIDk4MS4yMjYxNDkgMTcyLjI1NzA4OSA5ODEuMjI2MTQ5IDgyLjQzNzU5IDkwOC40MTAzODUgOS42MjI5NDQgODE4LjU5MiA5LjYyMjk0NCA3MjguNzcwMjcgOS42MjI5NDQgNjU1Ljk1Nzg1NyA4Mi40Mzc1OSA2NTUuOTU3ODU3IDE3Mi4yNTcwODkgNjU1Ljk1Nzg1NyAxODAuNjk3MDIzIDY1Ny4yMDEwMjcgMTg4LjgwNDQwMSA2NTguNDQxOTYxIDE5Ni44OTcyNzRMMjU4LjYzMjY0OCAzNjEuNjYwNjUyQzIzMi42NDk5NzUgMzQ0LjA3MzI3MyAyMDEuMzIzMDE2IDMzMy43ODc1NTkgMTY3LjU4NTYwNCAzMzMuNzg3NTU5IDc3Ljc2Mzg3MiAzMzMuNzg3NTU5IDQuOTUxNDU4IDQwNi42MDMzMjEgNC45NTE0NTggNDk2LjQyMTcwNSA0Ljk1MTQ1OCA1ODYuMjQzNDM2IDc3Ljc2Mzg3NCA2NTkuMDU1ODQ5IDE2Ny41ODU2MDQgNjU5LjA1NTg0OSAyMDMuNjUwODg5IDY1OS4wNTU4NDkgMjM2LjY1NjIzNyA2NDYuOTMzMjgyIDI2My42MjY1MjYgNjI3LjA2NDlMNjU3LjA0MjU2MyA4MjYuNTIwOTQ2QzY1OS40NTc0NzkgOTE0LjIzMDE4MSA3MzAuOTMxODY2IDk4NC43MDEzMzIgODE5LjIyODA5MiA5ODQuNzAxMzMyIDkwOS4wNDc1OTIgOTg0LjcwMTMzMiA5ODEuODYyMjQxIDkxMS44ODg5MTkgOTgxLjg2MjI0MSA4MjIuMDY3MTg5IDk4MS44NjExMjYgNzMyLjI0ODgwNCA5MDkuMDQ2NDc3IDY1OS40MzMwNCA4MTkuMjI2OTc3IDY1OS40MzMwNEw4MTkuMjI2OTc3IDY1OS40MzMwNFoiIHAtaWQ9IjQ0OTciIGZpbGw9IiMyOEEwRkYiPjwvcGF0aD48L3N2Zz4=",
  inPoints: [[0, 0.5]],
  label: "分支节点",
  name: "分支节点",
  nodeType: "branch",
  noteType: undefined,
  offsetX: 22,
  offsetY: 13,
  outPoints: [[1, 0.4], [1, 0.6]],
  shape: "customNode",
  size: [140, 38],
  type: "node",
  anchorPoints: [
    [1, 0.4], [1, 0.6]
  ],
  x: 275,
  y: 310.5999984741211,
}
var node4 = {
  color: "#5A6C81",
  iconType: "1",
  iconUrl: "el-icon-collection-tag",
  id: "node35",
  image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTc2NjU2MTM3OTY0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUyODMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMTU5LjYyMzUyOSAzOS4xNTI5NDF2OTUxLjcxNzY0N2wzNjEuNDExNzY1LTI0MC45NDExNzYgMzYxLjQxMTc2NSAyNDAuOTQxMTc2VjM5LjE1Mjk0MWgtNzIyLjgyMzUzeiBtNjYyLjU4ODIzNiA4MzcuMjcwNTg4bC0zMDEuMTc2NDcxLTE5OC43NzY0Ny0zMDEuMTc2NDcgMTk4Ljc3NjQ3Vjk5LjM4ODIzNWg2MDIuMzUyOTQxdjc3Ny4wMzUyOTR6IiBmaWxsPSIjOUZBMkE2IiBwLWlkPSI1Mjg0Ij48L3BhdGg+PC9zdmc+",
  inPoints: [[0, 0.5]],
  label: "赋值节点",
  name: "赋值节点",
  nodeType: "assignment",
  noteType: undefined,
  offsetX: 28,
  offsetY: 18,
  outPoints: [[1, 0.5]],
  shape: "customNode",
  size: [140, 38],
  type: "node",
  x: 722,
  y: 350.5999984741211,
}
var node5 = {
  id: "node98",
  color: "#1FD6FF",
  iconType: "1",
  iconUrl: "el-icon-coordinate",
  image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTc2NjU2MjM3Njc3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjY5MjMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNDgwIDUxMmg2NHYzMjBoLTY0VjUxMnpNMTkyIDg5Nmg2NDBxLTEtMjctMTktNDV0LTQ1LTE5SDI1NnEtMjcgMS00NSAxOXQtMTkgNDV6IG02NC0xMjhoNTEycTU0IDEgOTAuNSAzNy41VDg5NiA4OTZ2NjRIMTI4di02NHExLTU0IDM3LjUtOTAuNVQyNTYgNzY4eiBtMjU2LTI1NnE4Mi0yIDEzNi01NnQ1Ni0xMzZxLTItODItNTYtMTM2dC0xMzYtNTZxLTgyIDItMTM2IDU2dC01NiAxMzZxMiA4MiA1NiAxMzZ0MTM2IDU2eiBtMCA2NHEtMTA5LTMtMTgxLTc1dC03NS0xODFxMy0xMDkgNzUtMTgxdDE4MS03NXExMDkgMyAxODEgNzV0NzUgMTgxcS0zIDEwOS03NSAxODF0LTE4MSA3NXoiIHAtaWQ9IjY5MjQiIGZpbGw9IiMxRkQ2RkYiPjwvcGF0aD48L3N2Zz4=",
  inPoints: [[0, 0.5]],
  isDoingStart: true,
  label: "服务节点",
  name: "服务节点",
  nodeType: "service",
  noteType: undefined,
  offsetX: 24,
  offsetY: 18,
  outPoints: [[1, 0.5]],
  shape: "customNode",
  size: [140, 38],
  type: "node",
  x: 371,
  y: 452.5999984741211,
}
var node6 = {
  color: "#9254DE",
  iconType: "1",
  iconUrl: "el-icon-edit-outline",
  id: "node164",
  image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTc2NjU2Mjg0NjM2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjgyNzYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDEyOHY2NEgxOTJ2NjQwaDY0MFY1MTJoNjR2Mzg0SDEyOFYxMjhoMzg0eiBtMzEyLTY0TDk2MCAyMDAgNTY4IDU5MS4wMDhsLTE2OC45OTIgMzQuMDE2IDM0LjAxNi0xNzAuMDE2TDgyNC4wMzIgNjR6TTQ5MiA0ODcuMDA4TDQ4MCA1NDRsNTYuOTkyLTEyTDg2OC45OTIgMjAwIDgyNCAxNTMuOTg0IDQ5MiA0ODYuOTc2eiIgcC1pZD0iODI3NyIgZmlsbD0iIzkyNTRERSI+PC9wYXRoPjwvc3ZnPg==",
  inPoints: [[0, 0.5]],
  isDoingEnd: true,
  label: "函数节点",
  name: "函数节点",
  nodeType: "functions",
  noteType: undefined,
  offsetX: 26,
  offsetY: 19,
  outPoints: [[1, 0.5]],
  shape: "customNode",
  size: [140, 38],
  type: "node",
  x: 633,
  y: 447.5999984741211,
}
var node7 = {
  color: "#F759AB",
  iconType: "1",
  iconUrl: "el-icon-chat-line-round",
  id: "node200",
  image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTc2NjU2MzE0OTU5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjkwNDgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMTc0Ljk3NiA4MjRsMTM1LjA0LTQ0Ljk5MiAyNCAxMS4wMDhBMzg0Ljc2OCAzODQuNzY4IDAgMCAwIDUxMiA4MzJjMTA4LjY3Mi0zLjMyOCAxOTkuMTY4LTM4Ljg0OCAyNzEuNDg4LTEwNi40OTZTODkzLjMxMiA1NzYgODk2IDQ4MGMtMi42ODgtOTYtNDAuMTkyLTE3Ny44NTYtMTEyLjUxMi0yNDUuNTA0UzYyMC42NzIgMTMxLjMyOCA1MTIgMTI4Yy0xMDguNjcyIDMuMzI4LTE5OS4xNjggMzguODQ4LTI3MS40ODggMTA2LjQ5NlMxMzAuNjg4IDM4NCAxMjggNDgwYzAgMzQuNjg4IDYuMDE2IDY4Ljk5MiAxNy45ODQgMTAzLjA0IDEyLjAzMiAzMy45MiAyOS42OTYgNjUuOTIgNTIuOTkyIDk2bDIyLjAxNiAyOC45OTItNDYuMDE2IDExNS45Njh6IG0tNDUuOTUyIDgxLjk4NGEyOS4yNDggMjkuMjQ4IDAgMCAxLTMyLjUxMi04LjUxMiAzMC40IDMwLjQgMCAwIDEtNi41MjgtMzMuNDcybDU4LjA0OC0xNDUuOTg0YTQzMy42NjQgNDMzLjY2NCAwIDAgMS02Mi4wOC0xMTMuNTM2QTM2MS42IDM2MS42IDAgMCAxIDY0IDQ4MGMyLjY4OC0xMTAuMDE2IDQ1LjMxMi0yMDUuODI0IDEyOC0yODcuNDg4QzI3NC42ODggMTEwLjg0OCAzODEuMzEyIDY4LjAzMiA1MTIgNjRjMTMwLjY4OCA0LjAzMiAyMzcuMzEyIDQ2Ljg0OCAzMjAgMTI4LjUxMiA4Mi42ODggODEuNjY0IDEyNS4zMTIgMTc3LjQ3MiAxMjggMjg3LjQ4OC0yLjY4OCAxMTAuMDE2LTQ1LjMxMiAyMDUuODI0LTEyOCAyODcuNDg4LTgyLjY4OCA4MS42NjQtMTg5LjMxMiAxMjQuNDgtMzIwIDEyOC41MTJhNDY0LjY0IDQ2NC42NCAwIDAgMS0yMDYuOTc2LTQ4bC0xNzYgNTcuOTg0ek0zNTIgNTQ0aDMyMGMyMS4zMTIgMCAzMiAxMC42ODggMzIgMzIgMCAyMS4zMTItMTAuNjg4IDMyLTMyIDMyaC0zMjBjLTIxLjMxMiAwLTMyLTEwLjY4OC0zMi0zMiAwLTIxLjMxMiAxMC42ODgtMzIgMzItMzJ6IG0zMi0xOTJoMjU2YzIxLjMxMiAwIDMyIDEwLjY4OCAzMiAzMiAwIDIxLjMxMi0xMC42ODggMzItMzIgMzJIMzg0Yy0yMS4zMTIgMC0zMi0xMC42ODgtMzItMzIgMC0yMS4zMTIgMTAuNjg4LTMyIDMyLTMyeiIgcC1pZD0iOTA0OSIgZmlsbD0iI0Y3NTlBQiI+PC9wYXRoPjwvc3ZnPg==",
  inPoints: [[0, 0.5]],
  isDoingEnd: true,
  label: "回复节点",
  name: "回复节点",
  nodeType: "reply",
  noteType: undefined,
  offsetX: 30,
  offsetY: 17,
  outPoints: [[1, 0.5]],
  shape: "customNode",
  size: [140, 38],
  type: "node",
  x: 697,
  y: 575.5999984741211,
}


const datas = {
  nodes: [node1, node2, node3, node4, node5, node6, node7],
  edges: [
    {
      id: "edge78",
      shape: "customEdge",
      source: "node3",
      target: "node13",
      type: "edge",
    },
    {
      id: "edge79",
      shape: "customEdge",
      source: "node13",
      target: "node27",
      type: "edge",
    },
    {
      id: "edge100",
      shape: "customEdge",
      source: "node13",
      target: "node35",
      type: "edge",
    },
    {
      id: "edge87",
      shape: "customEdge",
      source: "node27",
      sourceAnchor: 0,
      target: "node164",
      type: "edge",
      end: {
        x: 0,
        y: -19
      },
      endPoint: {x: 582.043795620438, y: 428.0999984741211},
      start:{
        x: 14,
        y: 19
      },
      startPoint:{
        anchorIndex: 1,
        index: 1,
        x: 345.5,
        y: 314.49999847412107
      }
    },
    {
      id: "edge102",
      shape: "customEdge",
      source: "node27",
      target: "node98",
      type: "edge",
      sourceAnchor: 1,
      endPoint: {x: 357.8169014084507, y: 433.0999984741211},
      end: {
        x: 0,
        y: -19
      },
      start: {
        x: -14,
        y: 19
      },
      startPoint: {
        anchorIndex: 1,
        index: 1,
        x: 345.5,
        y: 314.49999847412107,
      }
    },
    {
      id: "edge103",
      shape: "customEdge",
      source: "node98",
      target: "node200",
      type: "edge",
    },
    {
      id: "edge104",
      shape: "customEdge",
      source: "node35",
      target: "node200",
      type: "edge",
    },
  ],
}

let NodeTooltip = {
  type: 'tooltip', // 提示框
  formatText(model) {
    // 提示框文本内容
    const text = 'label: ' + model.name;
    return text;
  }
}

let EdgeTooltip = {
  type: 'edge-tooltip',       // 边提示框
  formatText(model) {         // 边提示框文本内容
    const text = 'source: ' + model.source
      + '<br/> target: ' + model.target
      + '<br/> weight: ' + model.weight;
    return text;
  }
}

function getData() {
  return datas
}

function nodeTooltip() {
  return NodeTooltip
}

function edgeTooltip() {
  return EdgeTooltip
}

export{
  getData,
  nodeTooltip,
  edgeTooltip
}
