import{aN as V,aP as L,a$ as O,k as F,i as U,a as g,s as y,D as A,b0 as D,F as r,_ as t,E as f,b1 as G,l as H,n as q,j as e,t as k,v as J,N as K,a6 as R}from"./index-CTFI2LGG.js";import{b as Q}from"./index-BbpQxzbw.js";function lo(){const o=V(O);return o[L]||o}function X(o){return U("MuiButton",o)}const z=F("MuiButton",["root","text","textInherit","textPrimary","textSecondary","textSuccess","textError","textInfo","textWarning","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","outlinedSuccess","outlinedError","outlinedInfo","outlinedWarning","contained","containedInherit","containedPrimary","containedSecondary","containedSuccess","containedError","containedInfo","containedWarning","disableElevation","focusVisible","disabled","colorInherit","colorPrimary","colorSecondary","colorSuccess","colorError","colorInfo","colorWarning","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","icon","iconSizeSmall","iconSizeMedium","iconSizeLarge"]),Y=g.createContext({}),Z=g.createContext(void 0),w=["children","color","component","className","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"],oo=o=>{const{color:a,disableElevation:n,fullWidth:i,size:s,variant:c,classes:p}=o,l={root:["root",c,`${c}${r(a)}`,`size${r(s)}`,`${c}Size${r(s)}`,`color${r(a)}`,n&&"disableElevation",i&&"fullWidth"],label:["label"],startIcon:["icon","startIcon",`iconSize${r(s)}`],endIcon:["icon","endIcon",`iconSize${r(s)}`]},u=J(l,X,p);return t({},p,u)},E=o=>t({},o.size==="small"&&{"& > *:nth-of-type(1)":{fontSize:18}},o.size==="medium"&&{"& > *:nth-of-type(1)":{fontSize:20}},o.size==="large"&&{"& > *:nth-of-type(1)":{fontSize:22}}),ao=y(A,{shouldForwardProp:o=>D(o)||o==="classes",name:"MuiButton",slot:"Root",overridesResolver:(o,a)=>{const{ownerState:n}=o;return[a.root,a[n.variant],a[`${n.variant}${r(n.color)}`],a[`size${r(n.size)}`],a[`${n.variant}Size${r(n.size)}`],n.color==="inherit"&&a.colorInherit,n.disableElevation&&a.disableElevation,n.fullWidth&&a.fullWidth]}})(({theme:o,ownerState:a})=>{var n,i;const s=o.palette.mode==="light"?o.palette.grey[300]:o.palette.grey[800],c=o.palette.mode==="light"?o.palette.grey.A100:o.palette.grey[700];return t({},o.typography.button,{minWidth:64,padding:"6px 16px",borderRadius:(o.vars||o).shape.borderRadius,transition:o.transitions.create(["background-color","box-shadow","border-color","color"],{duration:o.transitions.duration.short}),"&:hover":t({textDecoration:"none",backgroundColor:o.vars?`rgba(${o.vars.palette.text.primaryChannel} / ${o.vars.palette.action.hoverOpacity})`:f(o.palette.text.primary,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},a.variant==="text"&&a.color!=="inherit"&&{backgroundColor:o.vars?`rgba(${o.vars.palette[a.color].mainChannel} / ${o.vars.palette.action.hoverOpacity})`:f(o.palette[a.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},a.variant==="outlined"&&a.color!=="inherit"&&{border:`1px solid ${(o.vars||o).palette[a.color].main}`,backgroundColor:o.vars?`rgba(${o.vars.palette[a.color].mainChannel} / ${o.vars.palette.action.hoverOpacity})`:f(o.palette[a.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},a.variant==="contained"&&{backgroundColor:o.vars?o.vars.palette.Button.inheritContainedHoverBg:c,boxShadow:(o.vars||o).shadows[4],"@media (hover: none)":{boxShadow:(o.vars||o).shadows[2],backgroundColor:(o.vars||o).palette.grey[300]}},a.variant==="contained"&&a.color!=="inherit"&&{backgroundColor:(o.vars||o).palette[a.color].dark,"@media (hover: none)":{backgroundColor:(o.vars||o).palette[a.color].main}}),"&:active":t({},a.variant==="contained"&&{boxShadow:(o.vars||o).shadows[8]}),[`&.${z.focusVisible}`]:t({},a.variant==="contained"&&{boxShadow:(o.vars||o).shadows[6]}),[`&.${z.disabled}`]:t({color:(o.vars||o).palette.action.disabled},a.variant==="outlined"&&{border:`1px solid ${(o.vars||o).palette.action.disabledBackground}`},a.variant==="contained"&&{color:(o.vars||o).palette.action.disabled,boxShadow:(o.vars||o).shadows[0],backgroundColor:(o.vars||o).palette.action.disabledBackground})},a.variant==="text"&&{padding:"6px 8px"},a.variant==="text"&&a.color!=="inherit"&&{color:(o.vars||o).palette[a.color].main},a.variant==="outlined"&&{padding:"5px 15px",border:"1px solid currentColor"},a.variant==="outlined"&&a.color!=="inherit"&&{color:(o.vars||o).palette[a.color].main,border:o.vars?`1px solid rgba(${o.vars.palette[a.color].mainChannel} / 0.5)`:`1px solid ${f(o.palette[a.color].main,.5)}`},a.variant==="contained"&&{color:o.vars?o.vars.palette.text.primary:(n=(i=o.palette).getContrastText)==null?void 0:n.call(i,o.palette.grey[300]),backgroundColor:o.vars?o.vars.palette.Button.inheritContainedBg:s,boxShadow:(o.vars||o).shadows[2]},a.variant==="contained"&&a.color!=="inherit"&&{color:(o.vars||o).palette[a.color].contrastText,backgroundColor:(o.vars||o).palette[a.color].main},a.color==="inherit"&&{color:"inherit",borderColor:"currentColor"},a.size==="small"&&a.variant==="text"&&{padding:"4px 5px",fontSize:o.typography.pxToRem(13)},a.size==="large"&&a.variant==="text"&&{padding:"8px 11px",fontSize:o.typography.pxToRem(15)},a.size==="small"&&a.variant==="outlined"&&{padding:"3px 9px",fontSize:o.typography.pxToRem(13)},a.size==="large"&&a.variant==="outlined"&&{padding:"7px 21px",fontSize:o.typography.pxToRem(15)},a.size==="small"&&a.variant==="contained"&&{padding:"4px 10px",fontSize:o.typography.pxToRem(13)},a.size==="large"&&a.variant==="contained"&&{padding:"8px 22px",fontSize:o.typography.pxToRem(15)},a.fullWidth&&{width:"100%"})},({ownerState:o})=>o.disableElevation&&{boxShadow:"none","&:hover":{boxShadow:"none"},[`&.${z.focusVisible}`]:{boxShadow:"none"},"&:active":{boxShadow:"none"},[`&.${z.disabled}`]:{boxShadow:"none"}}),no=y("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:(o,a)=>{const{ownerState:n}=o;return[a.startIcon,a[`iconSize${r(n.size)}`]]}})(({ownerState:o})=>t({display:"inherit",marginRight:8,marginLeft:-4},o.size==="small"&&{marginLeft:-2},E(o))),io=y("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:(o,a)=>{const{ownerState:n}=o;return[a.endIcon,a[`iconSize${r(n.size)}`]]}})(({ownerState:o})=>t({display:"inherit",marginRight:-4,marginLeft:8},o.size==="small"&&{marginRight:-2},E(o))),ro=g.forwardRef(function(a,n){const i=g.useContext(Y),s=g.useContext(Z),c=G(i,a),p=H({props:c,name:"MuiButton"}),{children:l,color:u="primary",component:v="button",className:C,disabled:d=!1,disableElevation:m=!1,disableFocusRipple:$=!1,endIcon:I,focusVisibleClassName:P,fullWidth:N=!1,size:T="medium",startIcon:B,type:h,variant:W="text"}=p,j=q(p,w),b=t({},p,{color:u,component:v,disabled:d,disableElevation:m,disableFocusRipple:$,fullWidth:N,size:T,type:h,variant:W}),x=oo(b),M=B&&e.jsx(no,{className:x.startIcon,ownerState:b,children:B}),S=I&&e.jsx(io,{className:x.endIcon,ownerState:b,children:I}),_=s||"";return e.jsxs(ao,t({ownerState:b,className:k(i.className,x.root,C,_),component:v,disabled:d,focusRipple:!$,focusVisibleClassName:k(x.focusVisible,P),ref:n,type:h},j,{classes:x,children:[M,l,S]}))}),eo=({text:o="",iconLeft:a=!0,id:n,children:i,classes:s,type:c="button",btnType:p="",permission:l="add",onClick:u=()=>{},...v})=>{const{t:C}=K(),{checkPermission:d}=Q();return p==="ordinary"?e.jsxs("button",{onClick:()=>{d(l)&&u()},...v,className:`font-[600] flex items-center ${d(l)?"text-[var(--main)]":"text-[var(--gray30)] cursor-not-allowed"}`,children:[a===!0?e.jsx(R,{fill:d(l)?"var(--main)":"var(--gray30)"}):a,i||e.jsx("p",{children:o})]}):e.jsx("div",{id:n||"addBtn",...v,children:e.jsxs(ro,{type:c,onClick:()=>{d(l)&&u()},className:`${s} ${d(l)?"":"disabled"}`,children:[a===!0?e.jsx(R,{fill:d(l)?"white":"var(--gray90)"}):a,i||e.jsx("span",{className:"font-[600] ml-1",children:C(o)})]})})};export{eo as A,ro as B,lo as u};