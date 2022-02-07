interface PublicPostData {
  id: string;
  title: string;
  body: string | null;
  sectionId: string;
  author: { name: string };
  upsNum: number;
  downsNum: number;
  ups: {}[];
  downs: {}[];
}
