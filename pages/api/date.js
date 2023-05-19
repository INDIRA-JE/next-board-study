export default function date(request, response) {
  let date = new Date();
  response.status(200).json(date);
}
