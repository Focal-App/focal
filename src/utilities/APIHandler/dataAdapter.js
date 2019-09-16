import { formatDate } from "utilities/date";

const DefaultText = {
    noContent: "-",
}

class DataAdapter {
    static toUserModel = (apiUser) => {
        const { avatar, email, first_name, uuid } = apiUser;
        return {
            avatar,
            email,
            first_name,
            uuid
        }
    }

    static toClientModel = (apiClient) => {
        const { client_name, uuid } = apiClient;
        return {
            client_name: client_name ? client_name : DefaultText.noContent,
            uuid
        }
}

    static toTaskModel = (apiTask) => {
        const { category, is_completed, step, uuid } = apiTask;
        return {
            category: category ? category : DefaultText.noContent,
            is_completed,
            step: step ? step : DefaultText.noContent,
            uuid
        }
    }

    static toEventModel = (apiEvent) => {
        const { event_name, package_uuid, shoot_date, uuid } = apiEvent;
        return {
            event_name: event_name ? event_name : DefaultText.noContent,
            package_uuid,
            shoot_date: shoot_date ? formatDate(shoot_date) : DefaultText.noContent,
            uuid
        }
    }

    static toPackageModel = (apiPackage) => {
        const { package_events, package_name, uuid } = apiPackage;
        const upcoming_shoot_date = package_events.length > 0 && package_events[0].shoot_date 
                                    ? formatDate(package_events[0].shoot_date) 
                                    : DefaultText.noContent;
        
        return {
            package_events: package_events.map(event => this.toEventModel(event)),
            package_name: package_name ? package_name : DefaultText.noContent,
            uuid,
            upcoming_shoot_date
        }
    }

    static toAllClientDataModel = (apiUserClients) => {
        if (apiUserClients.length === 0) { 
            return [];
        }
        return apiUserClients.map(client => {
            return {
                client: this.toClientModel(client),
                current_stage: this.toTaskModel(client.current_stage),
                package: this.toPackageModel(client.package)
            }
        })
    }

}

export default DataAdapter;