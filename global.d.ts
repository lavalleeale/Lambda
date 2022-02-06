interface PublicPostData {
  id: string;
  title: string;
  body: string | null;
  sectionId: string;
  author: { name: string };
}
