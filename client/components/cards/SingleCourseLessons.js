import { List, Avatar } from "antd";
const { Item } = List;

const SingleCourseLessons = ({
  lessons,
  setPreview,
  showModal,
  setShowModal,
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col lesson-list">
          {lessons && <h4>{lessons.length} Lessons</h4>}
          <hr />
          <List
            itemLayout="horizontal"
            dataSource={lessons}
            renderItem={(item, index) => (
              <Item>
                <Item.Meta
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                />
                {item.video && item.video !== null && item.free_preview && (
                  <span
                    className="text-primary pointer"
                    onClick={() => {
                      setPreview(item.video.url);
                      setShowModal(!showModal);
                    }}
                  >
                    Preview
                  </span>
                )}
              </Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCourseLessons;
