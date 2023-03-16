import { Button, Progress, Switch } from "antd";
import { CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";

const UpdateLessonForm = ({
  current,
  setCurrent,
  handleUpdateLesson,
  uploading,
  uploadVideoButtonText,
  handleVideo,
  progress,
}) => {
  return (
    <div className="container pt-3">
      {/* {JSON.stringify(current)} */}
      <form onSubmit={handleUpdateLesson}>
        <input
          type="text"
          className="form-control square"
          onChange={(e) => setCurrent({ ...current, title: e.target.value })}
          value={current.title}
          autoFocus
          required
        />

        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => setCurrent({ ...current, content: e.target.value })}
          value={current.content}
        ></textarea>

        <div>
          {!uploading && current.video && current.video.url && (
            <div className="pt-2 d-flex justify-content-center">
              <ReactPlayer
                url={current.video.url}
                width="410px"
                height="240px"
                controls
              />
            </div>
          )}

          <label className="btn btn-dark btn-block text-left mt-3">
            {uploadVideoButtonText}
            <input onChange={handleVideo} type="file" accept="video/*" hidden />
          </label>
        </div>

        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            steps={10}
          />
        )}

        <div className="d-flex justify-content-between">
          <span className="pt-3 badge">Preview</span>
          <Switch
            className="float-right mt-2"
            disabled={uploading}
            checked={current.free_preview}
            name="fee_preview"
            onChange={(v) => setCurrent({ ...current, free_preview: v })}
          />
        </div>

        <Button
          onClick={handleUpdateLesson}
          className="col mt-3"
          size="large"
          type="primary"
          loading={uploading}
          shape="round"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default UpdateLessonForm;
