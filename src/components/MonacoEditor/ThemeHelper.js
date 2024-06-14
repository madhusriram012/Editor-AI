import TomorrowNightBlue from "../../assets/themes/Tomorrow-Night-Blue.json";
import OceanNext from "../../assets/themes/OceanNext.json";
import Github from "../../assets/themes/Github.json";
import ChromeDevTools from "../../assets/themes/ChromeDevTools.json";
import BlackBoard from "../../assets/themes/blackboard.json";

export function DefineMonacoThemes(monaco){
  monaco.editor.defineTheme("tomorrow-night-blue", TomorrowNightBlue);
  monaco.editor.defineTheme("ocean-next", OceanNext);
  monaco.editor.defineTheme("github", Github);
  monaco.editor.defineTheme("chrome-devtools", ChromeDevTools);
  monaco.editor.defineTheme("blackboard", BlackBoard);
}